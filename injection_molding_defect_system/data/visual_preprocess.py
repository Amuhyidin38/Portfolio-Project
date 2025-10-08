import cv2
import json
import os
from PIL import Image

def preprocess_image(image_path, output_size=(512, 512)):
    img = cv2.imread(image_path)
    img = cv2.resize(img, output_size)
    v2.imwrite(f'data/visual/processed/{os.path.basename(image_path)}', img)
    return img

# Example: Annotate sample (in real project, use LabelImg for bounding boxes)
annotations = []  # List of dicts: {'type': 'flash', 'bbox': (x1,y1,x2,y2), 'severity': 'MAJOR'}
with open('data/visual/annotations.json', 'w') as f:
    json.dump(annotations, f)

     # Run on sample images
for img_file in os.listdir('data/visual/raw'):
    preprocess_image(f'data/visual/raw/{img_file}')
     