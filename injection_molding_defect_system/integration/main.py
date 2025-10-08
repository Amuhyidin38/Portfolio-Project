# Pseudo-code
from models.visual_inference import analyze_image
from models.monitoring_inference import monitor_telemetry

def full_analysis(image_path, telemetry_data, part_name):
    visual_results = analyze_image(image_path, part_name)
    monitoring_results, defects = monitor_telemetry(telemetry_data)
    # Merge: e.g., if monitoring predicts 'flash' and visual detects it, escalate severity
    return {'visual': visual_results, 'monitoring': monitoring_results, 'correlated_defects': defects}

# Example
result = full_analysis('test_image.jpg', sample_data, 'bracket_part')
print(result)
   