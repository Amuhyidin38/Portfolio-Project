from ultralytics import YOLO
import yaml
# Dataset config (YOLO format: images + labels in txt)
dataset_config = {
    'train': 'data/visual/train',
    'val': 'data/visual/val',
    'nc': len(DEFECT_TYPES),  # num_classes
    'names': DEFECT_TYPES
    }
with open('models/dataset.yaml', 'w') as f:
    yaml.dump(dataset_config, f)
    model = YOLO('yolov8n.pt')  # Start with nano pre-trained
    model.train(data='models/dataset.yaml', epochs=50, imgsz=512, batch=16)
    model.export(format='onnx')  # For inference