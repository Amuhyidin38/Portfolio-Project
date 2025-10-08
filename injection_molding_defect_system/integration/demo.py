import streamlit as st

st.title("Injection Molding Defect Detection System")
uploaded_image = st.file_uploader("Upload Molded Part Image")
telemetry_input = st.text_area("Enter Telemetry (JSON)")

if st.button("Analyze"):
    if uploaded_image and telemetry_input:
        telemetry = eval(telemetry_input)  # Insecure; use json.loads in prod
        results = full_analysis(uploaded_image, telemetry, "uploaded_part")
        st.write("### Visual Inspection Results")
        for r in results['visual']:
            st.write(f"- **{r['Defect Type']}**: {r['Severity']} at {r['Location']}, Size: {r['Size']}")
            st.write(f"  Cause: {r['Likely Cause']} | Rec: {r['Recommendation']}")
        st.write("### Monitoring Alerts")
        for alert in results['monitoring']:
            st.write(f"- {alert}")
