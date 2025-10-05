import os
from dotenv import load_dotenv

load_dotenv()

# Hugging Face Configuration
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
MODEL_NAME = "unsloth/GLM-4.6-GGUF"  # You can change this to any model

# API Endpoint
API_URL = f"https://api-inference.huggingface.co/models/{MODEL_NAME}"
HEADERS = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}