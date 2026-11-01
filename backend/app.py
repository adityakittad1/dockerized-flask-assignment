from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": os.getenv("FRONTEND_ORIGIN", "*")}})

@app.get("/health")
def health():
    return jsonify(status="ok", service="backend")

@app.post("/process")
def process():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify(error="Send a JSON object with a name field."), 400
    name = payload.get("name")
    if not isinstance(name, str) or not name.strip():
        return jsonify(error="Name is required."), 400
    name = name.strip()
    if len(name) > 80:
        return jsonify(error="Name must be 80 characters or fewer."), 400
    return jsonify(message=f"Hello {name}! Data received successfully."), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))
