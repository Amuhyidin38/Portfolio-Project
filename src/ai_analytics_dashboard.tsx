import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, TrendingUp, Users, AlertCircle, Brain, Target } from 'lucide-react';

const AIAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [modelMetrics, setModelMetrics] = useState(null);
  const [predictions, setPredictions] = useState([]);

  // Simulated ML Model Training Results
  useEffect(() => {
    // Simulate model training and evaluation
    const trainingData = generateTrainingData();
    const metrics = evaluateModel(trainingData);
    setModelMetrics(metrics);
    setPredictions(generatePredictions());
  }, []);

  // Generate synthetic training data for demonstration
  function generateTrainingData() {
    const data = [];
    for (let epoch = 1; epoch <= 50; epoch++) {
      data.push({
        epoch,
        trainLoss: 0.7 * Math.exp(-epoch / 15) + 0.1 + Math.random() * 0.05,
        valLoss: 0.7 * Math.exp(-epoch / 15) + 0.15 + Math.random() * 0.08,
        trainAcc: Math.min(0.95, 0.5 + (epoch / 50) * 0.45 + Math.random() * 0.02),
        valAcc: Math.min(0.92, 0.5 + (epoch / 50) * 0.42 + Math.random() * 0.03)
      });
    }
    return data;
  }

  // Model evaluation metrics
  function evaluateModel(data) {
    const finalEpoch = data[data.length - 1];
    return {
      accuracy: 0.894,
      precision: 0.871,
      recall: 0.856,
      f1Score: 0.863,
      auc: 0.912,
      trainLoss: finalEpoch.trainLoss,
      valLoss: finalEpoch.valLoss
    };
  }

  // Generate prediction results
  function generatePredictions() {
    const features = ['tenure', 'monthlyCharges', 'totalCharges', 'contractType', 'supportCalls'];
    return features.map(feature => ({
      feature,
      importance: Math.random() * 0.3 + 0.1,
      correlation: (Math.random() - 0.5) * 0.8
    })).sort((a, b) => b.importance - a.importance);
  }

  // Confusion matrix data
  const confusionMatrix = [
    { actual: 'No Churn', predicted: 'No Churn', value: 1820 },
    { actual: 'No Churn', predicted: 'Churn', value: 180 },
    { actual: 'Churn', predicted: 'No Churn', value: 142 },
    { actual: 'Churn', predicted: 'Churn', value: 858 }
  ];

  // Customer segments
  const segments = [
    { name: 'High Risk', value: 24, color: '#ef4444' },
    { name: 'Medium Risk', value: 38, color: '#f59e0b' },
    { name: 'Low Risk', value: 38, color: '#10b981' }
  ];

  const trainingData = generateTrainingData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-10 h-10 text-blue-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Analytics Platform
          </h1>
        </div>
        <p className="text-slate-400 text-lg">Customer Churn Prediction System</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 text-blue-400" />
            <span className="text-green-400 text-sm">+2.3%</span>
          </div>
          <div className="text-3xl font-bold">{modelMetrics ? (modelMetrics.accuracy * 100).toFixed(1) : '0'}%</div>
          <div className="text-slate-400 text-sm">Model Accuracy</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 text-purple-400" />
            <span className="text-green-400 text-sm">+5.1%</span>
          </div>
          <div className="text-3xl font-bold">{modelMetrics ? (modelMetrics.f1Score * 100).toFixed(1) : '0'}%</div>
          <div className="text-slate-400 text-sm">F1 Score</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-green-400" />
            <span className="text-blue-400 text-sm">3,000</span>
          </div>
          <div className="text-3xl font-bold">12.4K</div>
          <div className="text-slate-400 text-sm">Customers Analyzed</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <span className="text-red-400 text-sm">High Alert</span>
          </div>
          <div className="text-3xl font-bold">24%</div>
          <div className="text-slate-400 text-sm">At-Risk Customers</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-700">
        {['overview', 'training', 'features', 'predictions'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium capitalize transition-all ${
              activeTab === tab
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Model Performance */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Model Performance Metrics
            </h3>
            <div className="space-y-4">
              {modelMetrics && Object.entries(modelMetrics).slice(0, 5).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-white font-bold">{(value * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${value * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Segments */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Risk Segmentation</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={segments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, value}) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {segments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'training' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Training Loss */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Training & Validation Loss</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trainingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="epoch" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                <Legend />
                <Line type="monotone" dataKey="trainLoss" stroke="#3b82f6" strokeWidth={2} name="Training Loss" />
                <Line type="monotone" dataKey="valLoss" stroke="#a855f7" strokeWidth={2} name="Validation Loss" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Training Accuracy */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Training & Validation Accuracy</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trainingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="epoch" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0.5, 1]} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                <Legend />
                <Line type="monotone" dataKey="trainAcc" stroke="#10b981" strokeWidth={2} name="Training Accuracy" />
                <Line type="monotone" dataKey="valAcc" stroke="#f59e0b" strokeWidth={2} name="Validation Accuracy" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Feature Importance Analysis</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={predictions} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis dataKey="feature" type="category" stroke="#94a3b8" width={150} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
              <Bar dataKey="importance" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'predictions' && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Confusion Matrix</h3>
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {confusionMatrix.map((item, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-xl border-2 ${
                  item.actual === item.predicted
                    ? 'bg-green-500/10 border-green-500'
                    : 'bg-red-500/10 border-red-500'
                }`}
              >
                <div className="text-3xl font-bold mb-2">{item.value}</div>
                <div className="text-sm text-slate-400">
                  Actual: {item.actual}
                  <br />
                  Predicted: {item.predicted}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-slate-400">
            <p>True Positives: 858 | True Negatives: 1820</p>
            <p>False Positives: 180 | False Negatives: 142</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalyticsDashboard;