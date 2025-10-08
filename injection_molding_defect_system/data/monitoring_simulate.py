import pandas as pd
import numpy as np
from datetime import datetime, timedelta

np.random.seed(42)
n_samples = 1000
start_time = datetime.now()

data = {
    'timestamp': [start_time + timedelta(seconds=i) for i in range(n_samples)],
    'injection_pressure': np.random.normal(1000, 50, n_samples),  # bar, with some anomalies
    'melt_temperature': np.random.normal(250, 10, n_samples),     # °C
    'mold_temperature': np.random.normal(60, 5, n_samples),
    'cycle_time': np.random.normal(40, 5, n_samples),
    'holding_pressure': np.random.normal(700, 30, n_samples),
    'cooling_time': np.random.normal(20, 2, n_samples)
    }

# Inject anomalies (e.g., pressure spike)
data['injection_pressure'][200:210] += 300  # Drift example

df = pd.DataFrame(data)
df.to_csv('data/monitoring/telemetry.csv', index=False)
print("Simulated data saved. Shape:", df.shape)
     