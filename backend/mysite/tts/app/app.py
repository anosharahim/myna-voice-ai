import subprocess
from flask import Flask ,jsonify, request, send_file
from TTS.api import TTS
import torch
import os
os.environ["COQUI_TOS_AGREED"] = "1"

app = Flask(__name__)
@app.route('/synthesize', methods=['POST'])
def synthesize():
     device = "cuda" if torch.cuda.is_available() else "cpu"
     model_path = "/app/tts_models/multilingual/multi-dataset/xtts_v2"
     
     tts = TTS(model_path, gpu=False)
    #  tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2", gpu=False, models_dir="/model")
     content = "this is a sample text"
     file_path = os.path.join('/output', 'sample.wav')

     try:
        tts.tts_to_file(
            text=content,
            speaker="Ana Florence",
            file_path=file_path,
            language='en',
            split_sentences=True
        )
        return send_file(file_path, mimetype='audio/wav')
     except Exception as e:
        print(f"Error during TTS synthesis: {e}")
        return jsonify({'error': 'Error during TTS synthesis'}), 500
    
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)



