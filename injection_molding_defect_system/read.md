### **Project Overview**
**Injection Molding Defect Detection & Classification System**

This project implements an AI/ML-based system for quality control in plastic injection molding. It integrates two main components:
- **Visual Inspection AI**: Uses computer vision to detect and classify defects in images of molded parts (e.g., flash, sink marks).
- **Real-Time Process Monitoring**: Analyzes machine telemetry data to detect anomalies, predict defects, and suggest adjustments.

The system follows the provided prompts for structured outputs, using Python, TensorFlow/PyTorch, OpenCV, and Prophet for ML tasks. It's designed as a modular prototype, scalable to production (e.g., via AWS).

**Key Goals**:
- Precise defect identification with severity, location, and recommendations.
- Real-time anomaly detection against "golden batch" profiles.
- Demo UI via Streamlit for easy testing.

---

### **Features**
- **Defect Detection**: Supports 8 defect types (flash, sink marks, weld lines, short shots, burns, warping, voids, surface defects).
- **Severity Classification**: Levels: CRITICAL, MAJOR, MINOR, COSMETIC.
- **Telemetry Monitoring**: Tracks 6 parameters (injection pressure, melt/mold temperature, cycle/holding/cooling time) with deviation alerts.
- **Outputs**: Matches prompt formats, including coordinates, sizes (mm), root causes, and process recommendations.
- **Data Handling**: Simulated datasets; extensible to real IoT/image sources.
- **UI Demo**: Streamlit app for uploading images and telemetry inputs.
- **Extensibility**: Rule-based + ML models; easy integration of LLMs for enhanced explanations.

---

### **Prerequisites**
- Python 3.9 or higher.
- GPU recommended for CV training (e.g., NVIDIA CUDA for TensorFlow).
- Basic familiarity with command-line tools and pip.

---

### **Setup Instructions**
Follow these steps to set up and run the project locally.

1. **Clone/Initialize Project**:
   - Create the directory structure:
     ```
     mkdir injection_molding_defect_system
     cd injection_molding_defect_system
     mkdir data models visual_monitoring integration outputs
     ```
   - (If using Git: `git init` and add files as you build.)

2. **Install Dependencies**:
   - Create and populate `requirements.txt`:
     ```
     tensorflow==2.13.0  # Or torch==2.0.0 for PyTorch
     opencv-python==4.8.0
     pillow==10.0.0
     pandas==2.0.3
     numpy==1.24.3
     scikit-learn==1.3.0
     prophet==1.1.5
     streamlit==1.25.0
     matplotlib==3.7.2
     ultralytics==8.0.0  # For YOLOv8
     ```
   - Install: `pip install -r requirements.txt`
   - Additional for augmentation (optional): `pip install albumentations`

3. **Configuration**:
   - Create `config.py` with the provided code (optimal ranges, defect types).
   - Adjust `GOLDEN_BATCH` based on your specific molding process.

4. **Data Preparation**:
   - Run Phase 2 scripts:
     - Visual: Download sample images (e.g., from Kaggle: search "manufacturing defects") to `data/visual/raw/`. Then run `python data/visual_preprocess.py`.
     - Monitoring: Run `python data/monitoring_simulate.py` to generate `data/monitoring/telemetry.csv`.
   - Annotate images manually (use tools like LabelImg) and save to `data/visual/annotations.json`.
   - Split data: Create `train`/`val` folders in `data/visual/`.

5. **Test Setup**:
   - Verify: `python -c "import tensorflow as tf; print(tf.__version__)"`
   - Expected Output: TensorFlow version printed.

**Time Estimate**: 30-60 minutes for initial setup.

---

### **Building the Project (Phases)**
The project is built in 5 phases. Run scripts sequentially for a full prototype.

- **Phase 1: Project Setup** (Done in Setup above).
- **Phase 2: Data Preparation**:
  - Scripts: `data/visual_preprocess.py`, `data/monitoring_simulate.py`.
  - Output: Processed images (~500) and telemetry CSV (1000+ rows with anomalies).
- **Phase 3: Visual Inspection AI**:
  - Install: `pip install ultralytics`.
  - Train: `python models/visual_train.py` (requires annotated YOLO-format labels).
  - Infer: `python models/visual_inference.py` (test on sample image).
  - Output: Defect reports in prompt format (e.g., "Defect Type: flash - Severity: MAJOR").
- **Phase 4: Real-Time Process Monitoring**:
  - Train: `python models/monitoring_train.py` (generates anomalies CSV).
  - Infer: `python models/monitoring_inference.py` (test with sample telemetry dict).
  - Output: Alerts like "injection_pressure deviation: 8.33% - Alert: Drift detected!".
- **Phase 5: Integration & Demo**:
  - Full Run: `python integration/main.py` (combines both modules).
  - UI: `streamlit run integration/demo.py` (upload image + JSON telemetry for analysis).

**Training Notes**:
- Visual Model: Fine-tune YOLOv8 on GPU (epochs=50, ~4-6 hours). Target mAP > 0.8.
- Monitoring: Isolation Forest trains quickly (<1 min); Prophet per parameter (~2 min each).
- Customization: Update rule-based functions (e.g., `get_likely_cause`) with domain expertise.

---

### **Usage**
1. **Standalone Modules**:
   - Visual: `analyze_image('path/to/image.jpg', 'part_name')` → Prints structured defects.
   - Monitoring: `monitor_telemetry({'injection_pressure': 1300, ...})` → Prints alerts/predictions.

2. **Full Analysis**:
   - Edit `integration/main.py` with your inputs.
   - Run: `python integration/main.py` → Outputs combined report (visual + monitoring).

3. **Demo UI**:
   - Launch: `streamlit run integration/demo.py`.
   - Upload an image and paste telemetry as JSON (e.g., `{"injection_pressure": 1300, ...}`).
   - Click "Analyze" → View results in sections: Visual Inspection & Monitoring Alerts.

4. **Example Outputs**:
   - **Visual**:
     ```
     - Defect Type: flash
     - Severity: MAJOR
     - Location: (150, 200)
     - Size: 12.50 mm
     - Likely Cause: Overpacking or mold misalignment
     - Recommendation: Decrease injection pressure by 10%
     ```
   - **Monitoring**:
     ```
     Anomalies Detected:
     - injection_pressure deviation: 8.33% - Alert: Drift detected!
     Potential Defects: ['flash or short shots']
     ALERT: Parameters outside optimal ranges.
     ```

**Real-Time Mode**: Modify `monitoring_inference.py` to loop with sleep(5) for streaming simulation.

---

### **Testing**
- **Unit Tests**: Add pytest (`pip install pytest`).
  - Example: Test `calc_deviation` function asserts correct % for edge values.
- **End-to-End**: Run 10 simulations with anomalies; verify prompt-format outputs.
- **Metrics**:
  - Visual: mAP@0.5 > 0.8 (use Ultralytics eval).
  - Monitoring: Precision/Recall > 0.85 on anomalies.
- **Edge Cases**: No defects (empty list), invalid images (handle with try-except), extreme telemetry (e.g., pressure=0).

Run tests: `pytest tests/` (create `tests/` folder with scripts).

---

### **Deployment & Scaling**
- **Local Prototype**: Ready after Phase 5.
- **Containerization**: Create `Dockerfile`:
  ```
  FROM python:3.9-slim
  WORKDIR /app
  COPY . /app
  RUN pip install -r requirements.txt
  CMD ["streamlit", "run", "integration/demo.py"]
  ```
  - Build/Run: `docker build -t defect-system .` then `docker run -p 8501:8501 defect-system`.
- **Production**:
  - Cloud: AWS SageMaker for training/inference; IoT Core for telemetry streaming (MQTT).
  - CV Serving: Export to ONNX/TensorFlow Serving.
  - Monitoring: Use Kafka for real-time data ingestion.
  - Logging: Save outputs to `outputs/`; integrate ELK stack for audits.
- **Optimizations**: Model quantization (TensorFlow Lite) for edge devices; add LSTM for advanced forecasting.

**Challenges & Mitigations**:
- Data Scarcity: Use transfer learning + synthetic augmentation.
- Calibration: Calibrate pixel-to-mm based on camera setup.
- Real Data: Replace simulations with factory APIs/sensors.

---

### **Limitations & Future Work**
- **Current**: Relies on simulated data; rule-based causes (not ML-driven).
- **Improvements**:
  - Integrate LLM (e.g., GPT via OpenAI API) for dynamic recommendations.
  - Multi-part support: Train per `part_name`.
  - Advanced ML: LSTM/Transformer for telemetry; segmentation (U-Net) for precise defect sizing.
  - Mobile App: Flutter frontend for factory floor use.

---

### **Contributing & License**
- Fork the repo and submit PRs for enhancements (e.g., new defect types).
- License: MIT (open for industrial use; add your own if commercializing).
- Contact: For questions, reference this README or the phase guides.

**Total Build Time**: 10-15 hours for prototype. Questions? Iterate on specific phases!