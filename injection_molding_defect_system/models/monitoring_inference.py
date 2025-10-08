def monitor_telemetry(current_data):  # Dict: {'injection_pressure': 1300, ...}
    alerts = []
    predicted_defects = []

    for param, value in current_data.items():
        dev = calc_deviation(value, GOLDEN_BATCH[param])
        if abs(dev) > 5:  # Threshold for alert
            alerts.append(f"{param} deviation: {dev:.2f}% - Alert: Drift detected!")
            predicted_defects.append(predict_defect_from_drift(param, dev))  # e.g., high pressure -> 'flash'

        # Prophet forecast check (simplified)
        if param in models:
            m, forecast = models[param]
            latest_forecast = forecast['yhat'].iloc[-1]
            if abs(value - latest_forecast) > 50:  # Threshold
                alerts.append(f"{param} anomaly predicted vs forecast.")

    # Output per prompt
    print("Anomalies Detected:")
    for alert in alerts:
        print(f"- {alert}")
    print("Potential Defects:", predicted_defects)
    if alerts:
        print("ALERT: Parameters outside optimal ranges. Compare to golden batch.")

    return alerts, predicted_defects

def predict_defect_from_drift(param, dev):
    # Rule-based from domain knowledge
    if param == 'injection_pressure' and dev > 0:
        return 'flash or short shots'
    return 'voids or warping'

# Example real-time simulation
sample_data = {'injection_pressure': 1300, 'melt_temperature': 280, 'mold_temperature': 90,
               'cycle_time': 45, 'holding_pressure': 800, 'cooling_time': 25}
monitor_telemetry(sample_data)
   