// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Brain, Users, TrendingUp, Target } from 'lucide-react';
import MetricCard from './components/MetricCard';
import TrainingChart from './components/TrainingChart';
import ConfusionMatrix from './components/ConfusionMatrix';
import CustomerTable from './components/CustomerTable';
import {
  generateTrainingData,
  evaluateModel,
  generatePredictions,
  getRiskDistribution
} from './utils/dataGenerator';

function App() {
  const [trainingData, setTrainingData] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [riskData, setRiskData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      const training = generateTrainingData();
      const preds = generatePredictions();
      const modelMetrics = evaluateModel(preds);
      const risk = getRiskDistribution();

      setTrainingData(training);
      setPredictions(preds);
      setMetrics(modelMetrics);
      setRiskData(risk);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700">Loading AI Analytics...</p>
        </div>
      </div>
    );
  }

  const atRiskCount = predictions.filter(p => p.risk === 'High').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                AI Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Customer Churn Prediction System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Model Accuracy"
            value={metrics.accuracy}
            unit="%"
            trend="up"
            trendValue="+2.3% vs last week"
            icon={Target}
          />
          <MetricCard
            title="F1 Score"
            value={metrics.f1Score}
            unit="%"
            trend="up"
            trendValue="+1.8%"
            icon={TrendingUp}
          />
          <MetricCard
            title="At-Risk Customers"
            value={atRiskCount}
            unit=""
            trend="down"
            trendValue="-12% this month"
            icon={Users}
          />
          <MetricCard
            title="AUC-ROC"
            value={metrics.auc}
            unit="%"
            trend="up"
            trendValue="+0.5%"
            icon={Brain}
          />
        </div>

        {/* Training Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TrainingChart
            data={trainingData}
            title="Model Loss Over Time"
            dataKeys={[
              { key: 'trainLoss', name: 'Training Loss', color: '#3b82f6' },
              { key: 'valLoss', name: 'Validation Loss', color: '#ef4444' }
            ]}
          />
          <TrainingChart
            data={trainingData}
            title="Model Accuracy Over Time"
            dataKeys={[
              { key: 'trainAccuracy', name: 'Training Accuracy', color: '#10b981' },
              { key: 'valAccuracy', name: 'Validation Accuracy', color: '#f59e0b' }
            ]}
          />
        </div>

        {/* Confusion Matrix */}
        <div className="mb-8">
          <ConfusionMatrix matrix={metrics.confusionMatrix} />
        </div>

        {/* Customer Predictions */}
        <CustomerTable customers={predictions} />

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>© 2025 AI Analytics Dashboard | Built with React & Machine Learning</p>
          <p className="mt-2">
            Model trained on {trainingData.length} epochs | 
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;