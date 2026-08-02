import cv2
import imageio_ffmpeg
import mediapipe as mp
import numpy as np
import librosa
from moviepy import VideoFileClip

mp_face_mesh = mp.solutions.face_mesh

LEFT_EYE = [362, 385, 387, 263, 373, 380]
RIGHT_EYE = [33, 160, 158, 133, 153, 144]

UPPER_LIP = 13
LOWER_LIP = 14

def eye_aspect_ratio(landmarks, eye_points, width, height):
    coords = [(landmarks[i].x * width, landmarks[i].y * height) for i in eye_points]
    vertical_1 = np.linalg.norm(np.array(coords[1]) - np.array(coords[5]))
    vertical_2 = np.linalg.norm(np.array(coords[2]) - np.array(coords[4]))
    horizontal = np.linalg.norm(np.array(coords[0]) - np.array(coords[3]))
    ear = (vertical_1 + vertical_2) / (2.0 * horizontal)
    return ear

def mouth_open_distance(landmarks, width, height):
    top = landmarks[UPPER_LIP]
    bottom = landmarks[LOWER_LIP]
    top_point = np.array([top.x * width, top.y * height])
    bottom_point = np.array([bottom.x * width, bottom.y * height])
    return np.linalg.norm(top_point - bottom_point)

def analyze_lip_sync(mouth_movements, video_path, fps):
    try:
        clip = VideoFileClip(video_path)
        if clip.audio is None:
            clip.close()
            return None

        audio_path = video_path + "_audio.wav"
        clip.audio.write_audiofile(audio_path, logger=None)
        clip.close()

        y, sr = librosa.load(audio_path)
        hop_length = int(sr / fps) if fps > 0 else 512
        rms = librosa.feature.rms(y=y, hop_length=hop_length)[0]

        import os
        os.remove(audio_path)

        target_len = min(len(mouth_movements), len(rms))
        if target_len < 2:
            return None

        mouth_arr = np.array(mouth_movements[:target_len])
        audio_arr = rms[:target_len]

        if np.std(mouth_arr) == 0 or np.std(audio_arr) == 0:
            return 0.0

        correlation = np.corrcoef(mouth_arr, audio_arr)[0, 1]
        if np.isnan(correlation):
            return 0.0

        sync_score = round(((correlation + 1) / 2) * 100, 2)
        return sync_score

    except Exception as e:
        print(f"Lip sync analysis failed: {e}")
        return None

def analyze_video(video_path):
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 25

    total_frames = 0
    frames_with_face = 0
    blink_count = 0
    was_closed = False
    EAR_THRESHOLD = 0.21
    mouth_movements = []

    with mp_face_mesh.FaceMesh(
        max_num_faces=1,
        refine_landmarks=True,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5
    ) as face_mesh:

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            total_frames += 1
            height, width = frame.shape[:2]
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = face_mesh.process(rgb_frame)

            if results.multi_face_landmarks:
                frames_with_face += 1
                landmarks = results.multi_face_landmarks[0].landmark

                left_ear = eye_aspect_ratio(landmarks, LEFT_EYE, width, height)
                right_ear = eye_aspect_ratio(landmarks, RIGHT_EYE, width, height)
                avg_ear = (left_ear + right_ear) / 2.0

                if avg_ear < EAR_THRESHOLD:
                    was_closed = True
                else:
                    if was_closed:
                        blink_count += 1
                    was_closed = False

                mouth_dist = mouth_open_distance(landmarks, width, height)
                mouth_movements.append(mouth_dist)
            else:
                mouth_movements.append(0)

    cap.release()

    face_detection_rate = (frames_with_face / total_frames * 100) if total_frames > 0 else 0
    lip_sync_score = analyze_lip_sync(mouth_movements, video_path, fps)

    return {
        "total_frames": total_frames,
        "frames_with_face": frames_with_face,
        "face_detection_rate": round(face_detection_rate, 2),
        "blink_count": blink_count,
        "lip_sync_score": lip_sync_score
    }