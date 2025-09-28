import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from pathlib import Path

# Load the pre-cleaned data
# Resolve paths relative to the project root (parent of this script's directory)
PROJECT_ROOT = Path(__file__).resolve().parent.parent
source_path = PROJECT_ROOT / 'model_data.csv'
df = pd.read_csv(source_path)

# Columns per task specification
numeric_features = ['time_spent', 'pages_viewed', 'basket_value']
categorical_features = ['device_type', 'customer_type']

# 1) Scale numeric features to 0-1 range (Min-Max)
scaler = MinMaxScaler()
df[numeric_features] = scaler.fit_transform(df[numeric_features])

# 2) One-hot encode categorical features with the required naming format
#    This will create columns like 'device_type_Desktop', 'customer_type_New', etc.
df_dummies = pd.get_dummies(df[categorical_features], prefix=categorical_features)

# 3) Build the final feature set: all original columns except the categorical ones, plus the one-hot columns
model_feature_set = pd.concat([
    df.drop(columns=categorical_features),
    df_dummies
], axis=1)

# Optional: persist to disk for downstream use
output_path = PROJECT_ROOT / 'model_feature_set.csv'
model_feature_set.to_csv(output_path, index=False)

# Quick sanity outputs
print('model_feature_set preview:')
print(model_feature_set.head())
print('\nColumns in model_feature_set:')
print(list(model_feature_set.columns))
print(f"\nSaved feature set to: {output_path}")
