df['ds'] = pd.to_datetime(df['timestamp'])  # For Prophet
df['y'] = df['injection_pressure']  # Example: Forecast pressure
# Train Prophet for each parameter (forecast deviations)
def train_prophet(param_col):
    m = Prophet(interval_width=0.8)
    m.fit(df[['ds', param_col]])
    future = m.make_future_dataframe(periods=100, freq='S')
    forecast = m.predict(future)
    return m, forecast
models = {}
for param in GOLDEN_BATCH.keys():
    if param != 'cycle_time':  # Skip non-forecastable for now
        models[param] = train_prophet(param)
   # Anomaly Detection with Isolation Forest
scaler = StandardScaler()
features = df[GOLDEN_BATCH.keys()].values
scaled_features = scaler.fit_transform(features)
iso_forest = IsolationForest(contamination=0.1, random_state=42)
df['anomaly'] = iso_forest.fit_predict(scaled_features)  # -1 = anomaly
# Calculate deviations from golden batch
def calc_deviation(value, optimal_range):
    low, high = optimal_range
    if value < low: return ((low - value) / low) * 100
    elif value > high: return ((value - high) / high) * 100
    return 0
for param, (low, high) in GOLDEN_BATCH.items():
    df[f'{param}_dev_%'] = df[param].apply(lambda x: calc_deviation(x, (low, high)))
df.to_csv('data/monitoring/anomalies.csv', index=False)
print("Anomalies detected. Sample deviations:\n", df[df['anomaly'] == -1].head())
   