import face_recognition
import cv2
from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from flask import Response
from flask import json
from bson import ObjectId
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://localhost:27017/')
db = client.PIW
users = db.users

@app.route("/")
def cam():
    video_capture = cv2.VideoCapture(0)
    known_face_encodings = []
    known_face_names = []
    user_connected = 0
    result = 0
    for user in users.find():    
        known_face_encodings.append(face_recognition.face_encodings(face_recognition.load_image_file(user['username']+".jpg"))[0])
        known_face_names.append(user['username'])

    face_locations = []
    face_encodings = []
    face_names = []
    process_this_frame = True
    while True:
        ret, frame = video_capture.read()
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = small_frame[:, :, ::-1]

        if process_this_frame:
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            face_names = []
            for face_encoding in face_encodings:
                matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                name = "Unknown"
                if True in matches:
                    first_match_index = matches.index(True)
                    name = known_face_names[first_match_index]
                    user_connected =users.find_one ({ "username" :  name })
                    if user_connected != 0:
                       return JSONEncoder().encode({"user":user_connected})

                    else:
                        return str("unknown")
                face_names.append(name)
        process_this_frame = not process_this_frame
        
        cv2.imshow('Video', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
	
    # Release handle to the webcam
    video_capture.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    app.run(debug=True)
