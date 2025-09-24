import pandas as pd
import numpy as np

# Load the raw data
df = pd.read_csv('raw_customer_data.csv')

# 1. Handle missing values according to specifications
# For time_spent: Replace missing values with median
time_spent_median = df['time_spent'].median()
df['time_spent'] = df['time_spent'].fillna(time_spent_median)

# For pages_viewed: Replace missing values with mean (after converting to float if needed)
if df['pages_viewed'].dtype == 'object':
    # Handle any non-numeric values if they exist
    df['pages_viewed'] = pd.to_numeric(df['pages_viewed'], errors='coerce')
pages_viewed_mean = df['pages_viewed'].mean()
df['pages_viewed'] = df['pages_viewed'].fillna(pages_viewed_mean).astype(int)  # Convert to int as required

# For basket_value: Replace missing values with 0
df['basket_value'] = df['basket_value'].fillna(0)

# For device_type: Replace missing values with "Unknown"
df['device_type'] = df['device_type'].fillna('Unknown')

# For customer_type: Replace missing values with "New"
df['customer_type'] = df['customer_type'].fillna('New')

# 2. Ensure data types are correct
df['customer_id'] = df['customer_id'].astype(int)
df['time_spent'] = df['time_spent'].astype(float)
df['pages_viewed'] = df['pages_viewed'].astype(int)
df['basket_value'] = df['basket_value'].astype(float)
df['purchase'] = df['purchase'].astype(int)

# 3. Standardize categorical values (in case there are variations in case or extra spaces)
df['device_type'] = df['device_type'].str.title().str.strip()
df['customer_type'] = df['customer_type'].str.title().str.strip()

# 4. Validate categorical values
valid_devices = ['Mobile', 'Desktop', 'Tablet', 'Unknown']
valid_customer_types = ['New', 'Returning']

df['device_type'] = df['device_type'].apply(lambda x: x if x in valid_devices else 'Unknown')
df['customer_type'] = df['customer_type'].apply(lambda x: x if x in valid_customer_types else 'New')

# Create the clean_data DataFrame
clean_data = df.copy()

# Display the first few rows of the cleaned data
print("First few rows of cleaned data:")
print(clean_data.head())

# Display information about the cleaned data
print("\nDataFrame info:")
print(clean_data.info())

# Display summary statistics
print("\nSummary statistics:")
print(clean_data.describe())

# Save the cleaned data to a CSV file (optional)
clean_data.to_csv('cleaned_customer_data.csv', index=False)
print("\nCleaned data has been saved to 'cleaned_customer_data.csv'")

# Note: The clean_data DataFrame is now ready for use in the notebook
