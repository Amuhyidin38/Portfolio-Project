import cv2
from ultralytics import YOLO
import numpy as np

model = YOLO('models/best.pt')
CALIBRATION_MM_PER_PX = 0.1  # Adjust based on camera setup

def analyze_image(image_path, part_name='molded part'):
    img = cv2.imread(image_path)
    results = model(img)

    outputs = []
    for r in results:
    boxes = r.boxes
    for box in boxes:
        x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
        defect_type = DEFECT_TYPES[int(box.cls[0].cpu().numpy())]
        severity = classify_severity(defect_type, (x2-x1)*(y2-y1))  # Custom function: e.g., large size = CRITICAL
        size_mm = np.sqrt((x2-x1)**2 + (y2-y1)**2) * CALIBRATION_MM_PER_PX
        location = f"({int(x1)}, {int(y1)})"  # Top-left corner
        cause = get_likely_cause(defect_type)  # Rule-based, e.g., 'flash': 'Excess pressure'
        recommendation = get_recommendation(defect_type)  # e.g., 'Reduce injection speed'

        outputs.append({
            'Defect Type': defect_type,
            'Severity': severity,
            'Location': location,
            'Size': f"{size_mm:.2f} mm",
            'Likely Cause': cause,
            'Recommendation': recommendation
        })

       # Output format per prompt
for out in outputs:
    print(f"- {out['Defect Type']}: {out['Severity']}")
    print(f"- Location: {out['Location']}")
    print(f"- Size: {out['Size']}")
    print(f"- Likely Cause: {out['Likely Cause']}")
    print(f"- Recommendation: {out['Recommendation']}\n")

return outputs

def classify_severity(type_, area_px):
    # Placeholder logic; train a separate model if needed
    if type_ in ['burns', 'voids']: return 'CRITICAL'
    if area_px > 10000: return 'MAJOR'
    return 'MINOR'  # etc.

def get_likely_cause(type_):
    causes = {'flash': 'Overpacking or mold misalignment', 'sink marks': 'Insufficient holding pressure'}
    return causes.get(type_, 'Unknown')

def get_recommendation(type_):
    recs = {'flash': 'Decrease injection pressure by 10%', 'sink marks': 'Increase holding pressure'}
    return recs.get(type_, 'Review process parameters')

# Example usage
analyze_image('data/visual/test_image.jpg', 'gear_part')
   