// src/utils/dataGenerator.js

/**
 * Generates realistic training data for ML model visualization
 * Simulates neural network training over epochs
 */
export const generateTrainingData = () => {
  const epochs = 50;
  const data = [];
  
  for (let i = 0; i < epochs; i++) {
    // Simulate exponential decay for training loss (realistic learning curve)
    const trainLoss = 0.8 * Math.exp(-0.05 * i) + 0.1 + Math.random() * 0.02;
    
    // Validation loss slightly higher (prevents overfitting)
    const valLoss = trainLoss + 0.05 + Math.random() * 0.03;
    
    // Accuracy increases logarithmically (realistic ML behavior)
    const trainAcc = 0.95 - 0.3 * Math.exp(-0.08 * i) + Math.random() * 0.01;
    const valAcc = trainAcc - 0.02 - Math.random() * 0.02;
    
    data.push({
      epoch: i + 1,
      trainLoss: parseFloat(trainLoss.toFixed(4)),
      valLoss: parseFloat(valLoss.toFixed(4)),
      trainAccuracy: parseFloat((trainAcc * 100).toFixed(2)),
      valAccuracy: parseFloat((valAcc * 100).toFixed(2))
    });
  }
  
  return data;
};

/**
 * Evaluates model performance metrics
 * Returns industry-standard ML evaluation metrics
 */
export const evaluateModel = (predictions) => {
  // Confusion matrix values (simulated from model predictions)
  const truePositive = 858;
  const trueNegative = 1820;
  const falsePositive = 180;
  const falseNegative = 142;
  
  const total = truePositive + trueNegative + falsePositive + falseNegative;
  
  // Calculate metrics
  const accuracy = ((truePositive + trueNegative) / total * 100).toFixed(1);
  const precision = (truePositive / (truePositive + falsePositive) * 100).toFixed(1);
  const recall = (truePositive / (truePositive + falseNegative) * 100).toFixed(1);
  const f1Score = (2 * (precision * recall) / (parseFloat(precision) + parseFloat(recall))).toFixed(1);
  
  return {
    accuracy: parseFloat(accuracy),
    precision: parseFloat(precision),
    recall: parseFloat(recall),
    f1Score: parseFloat(f1Score),
    auc: 91.2, // Area Under ROC Curve (simulated)
    confusionMatrix: {
      truePositive,
      trueNegative,
      falsePositive,
      falseNegative
    }
  };
};

/**
 * Generates customer predictions with churn probabilities
 */
export const generatePredictions = () => {
  const customers = [];
  const names = ['Sarah Johnson', 'Michael Chen', 'Emily Davis', 'Robert Williams', 
                 'Jennifer Martinez', 'David Brown', 'Lisa Anderson', 'James Wilson',
                 'Maria Garcia', 'John Taylor'];
  
  for (let i = 0; i < 10; i++) {
    const churnProb = Math.random();
    const risk = churnProb > 0.7 ? 'High' : churnProb > 0.4 ? 'Medium' : 'Low';
    
    customers.push({
      id: `CUST${1000 + i}`,
      name: names[i],
      churnProbability: parseFloat((churnProb * 100).toFixed(1)),
      risk: risk,
      tenure: Math.floor(Math.random() * 60) + 1,
      monthlyCharges: parseFloat((Math.random() * 100 + 20).toFixed(2)),
      contractType: Math.random() > 0.5 ? 'Month-to-month' : 'Annual'
    });
  }
  
  return customers.sort((a, b) => b.churnProbability - a.churnProbability);
};

/**
 * Generates feature importance data
 * Shows which features contribute most to predictions
 */
export const getFeatureImportance = () => {
  return [
    { feature: 'Tenure', importance: 28.5 },
    { feature: 'Monthly Charges', importance: 23.2 },
    { feature: 'Total Charges', importance: 18.7 },
    { feature: 'Contract Type', importance: 15.3 },
    { feature: 'Support Calls', importance: 14.3 }
  ];
};

/**
 * Generates risk distribution data for pie chart
 */
export const getRiskDistribution = () => {
  return [
    { name: 'Low Risk', value: 1245, color: '#10b981' },
    { name: 'Medium Risk', value: 856, color: '#f59e0b' },
    { name: 'High Risk', value: 399, color: '#ef4444' }
  ];
};