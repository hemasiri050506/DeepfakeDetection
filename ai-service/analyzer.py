import cv2
import mediapipe as mp
import numpy as np

mp_face_mesh = mp.solutions.face_mesh

LEFT_EYE = [362, 385, 387, 263, 373, 380]
RIGHT_EYE = [33, 160, 158, 133, 153, 144]

def eye_aspect_ratio(landmarks, eye_points, width, height):
    coords = [(landmarks[i].x * width, landmarks[i].y * height) for i in eye_points]
    vertical_1 = np.linalg.norm(np.array(coords[1]) - np.array(coords[5]))
    vertical_2 = np.linalg.norm(np.array(coords[2]) - np.array(coords[4]))
    horizontal = np.linalg.norm(np.array(coords[0]) - np.array(coords[3]))
    ear = (vertical_1 + vertical_2) / (2.0 * horizontal)
    return ear

def analyze_video(video_path):
    cap = cv2.VideoCapture(video_path)

    total_frames = 0
    frames_with_face = 0
    blink_count = 0
    was_closed = False
    EAR_THRESHOLD = 0.21

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

    cap.release()

    face_detection_rate = (frames_with_face / total_frames * 100) if total_frames > 0 else 0

    return {
        "total_frames": total_frames,
        "frames_with_face": frames_with_face,
        "face_detection_rate": round(face_detection_rate, 2),
        "blink_count": blink_count
    }