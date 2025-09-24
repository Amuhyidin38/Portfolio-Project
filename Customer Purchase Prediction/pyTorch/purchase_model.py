import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.preprocessing import StandardScaler

# Load datasets
train_df = pd.read_csv("input_model_features.csv")
val_df = pd.read_csv("validation_features.csv")

# Separate features and target
X_train = train_df.drop(columns=["customer_id", "purchase"]).values
y_train = train_df["purchase"].values

X_val = val_df.drop(columns=["customer_id"]).values
val_ids = val_df["customer_id"].values

# Normalize features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_val_scaled = scaler.transform(X_val)

# Convert to PyTorch tensors
X_train_tensor = torch.tensor(X_train_scaled, dtype=torch.float32)
y_train_tensor = torch.tensor(y_train.reshape(-1, 1), dtype=torch.float32)
X_val_tensor = torch.tensor(X_val_scaled, dtype=torch.float32)

# Define the neural network
class PurchaseNet(nn.Module):
    def __init__(self, input_dim):
        super(PurchaseNet, self).__init__()
        self.fc1 = nn.Linear(input_dim, 8)
        self.relu = nn.ReLU()
        self.output = nn.Linear(8, 1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.output(x)
        return self.sigmoid(x)

# Initialize model
input_dim = X_train.shape[1]
purchase_model = PurchaseNet(input_dim)

# Training setup
criterion = nn.BCELoss()
optimizer = optim.Adam(purchase_model.parameters(), lr=1e-3)
epochs = 30

# Training loop
losses = []
for epoch in range(epochs):
    purchase_model.train()
    optimizer.zero_grad()
    outputs = purchase_model(X_train_tensor)
    loss = criterion(outputs, y_train_tensor)
    loss.backward()
    optimizer.step()
    losses.append(loss.item())
    if (epoch + 1) % 5 == 0 or epoch == 0:
        print(f"Epoch {epoch+1}/{epochs} - Loss: {loss.item():.4f}")

# Predict on validation set
purchase_model.eval()
with torch.no_grad():
    predictions = purchase_model(X_val_tensor).numpy().flatten()

"""
Required outputs:
- purchase_model: trained PyTorch model
- validation_predictions: DataFrame with columns ['customer_id', 'purchase'] containing binary predictions
"""

# Build required output DataFrame
validation_predictions = pd.DataFrame({
    "customer_id": val_ids,
    "purchase": (predictions >= 0.5).astype(int)
})

# Optional: save predictions
# validation_predictions.to_csv("validation_predictions.csv", index=False)

