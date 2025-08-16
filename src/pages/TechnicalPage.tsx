import React from 'react';
import { Cpu, Database, Layers, BarChart3, Clock, Target, Zap, Shield } from 'lucide-react';

const TechnicalPage: React.FC = () => {
  const architectureFeatures = [
    {
      icon: <Layers className="h-8 w-8 text-blue-600" />,
      title: "Deep CNN Architecture",
      description: "Multi-layered convolutional neural network with optimized feature extraction"
    },
    {
      icon: <Database className="h-8 w-8 text-green-600" />,
      title: "Comprehensive Dataset",
      description: "15,000+ labeled images across 12 pest species common in peanut farming"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Real-time Processing",
      description: "Optimized inference pipeline with average processing time of 2.3 seconds"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Robust Validation",
      description: "Cross-validation with 95.7% accuracy across diverse field conditions"
    }
  ];

  const performanceMetrics = [
    { label: "Overall Accuracy", value: "95.7%", color: "text-green-600" },
    { label: "Precision", value: "94.3%", color: "text-blue-600" },
    { label: "Recall", value: "96.1%", color: "text-purple-600" },
    { label: "F1-Score", value: "95.2%", color: "text-orange-600" },
    { label: "Processing Time", value: "2.3s", color: "text-red-600" },
    { label: "Model Size", value: "45MB", color: "text-indigo-600" }
  ];

  const pestClasses = [
    { name: "Cicadella viridis", accuracy: "97.2%", samples: "1,450" },
    { name: "Aphis craccivora", accuracy: "95.8%", samples: "1,320" },
    { name: "Thrips palmi", accuracy: "94.1%", samples: "1,180" },
    { name: "Spodoptera litura", accuracy: "96.5%", samples: "1,280" },
    { name: "Bemisia tabaci", accuracy: "93.7%", samples: "1,150" },
    { name: "Helicoverpa armigera", accuracy: "95.9%", samples: "1,240" },
    { name: "Empoasca kerri", accuracy: "94.8%", samples: "1,200" },
    { name: "Liriomyza trifolii", accuracy: "92.4%", samples: "1,080" },
    { name: "Tetranychus urticae", accuracy: "96.3%", samples: "1,290" },
    { name: "Frankliniella schultzei", accuracy: "93.1%", samples: "1,020" },
    { name: "Nezara viridula", accuracy: "95.4%", samples: "1,190" },
    { name: "Riptortus serripes", accuracy: "94.6%", samples: "1,160" }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Technical Specifications
          </h1>
          <p className="text-xl text-gray-600">
            Detailed technical overview of our CNN-based pest detection system
          </p>
        </div>

        {/* Architecture Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Cpu className="mr-3 h-8 w-8 text-blue-600" />
            System Architecture
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {architectureFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Model Architecture Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Network Layers</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Input Layer: 224x224x3 (RGB)</li>
                  <li>• Conv2D Blocks: 5 layers with ReLU activation</li>
                  <li>• MaxPooling: 2x2 with stride 2</li>
                  <li>• Dropout: 0.5 regularization</li>
                  <li>• Dense Layers: 512, 256, 12 neurons</li>
                  <li>• Output: Softmax for 12-class classification</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Training Configuration</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Framework: TensorFlow 2.8</li>
                  <li>• Optimizer: Adam (lr=0.001)</li>
                  <li>• Loss Function: Categorical Crossentropy</li>
                  <li>• Batch Size: 32</li>
                  <li>• Epochs: 100 with early stopping</li>
                  <li>• Data Augmentation: Rotation, flip, zoom</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="mr-3 h-8 w-8 text-green-600" />
            Performance Metrics
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-3xl font-bold mb-2 ${metric.color}`}>
                  {metric.value}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Validation Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Cross-Validation</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">5-Fold CV Accuracy:</span>
                    <span className="font-semibold text-green-600">95.7% ± 1.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Test Set Accuracy:</span>
                    <span className="font-semibold text-green-600">94.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Validation Loss:</span>
                    <span className="font-semibold text-blue-600">0.148</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Field Testing</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Field Trials:</span>
                    <span className="font-semibold">25 farms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Real-world Accuracy:</span>
                    <span className="font-semibold text-green-600">92.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">User Satisfaction:</span>
                    <span className="font-semibold text-purple-600">4.8/5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pest Classification Details */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="mr-3 h-8 w-8 text-purple-600" />
            Classification Performance by Species
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pest Species
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Accuracy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Training Samples
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pestClasses.map((pest, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <em>{pest.name}</em>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      {pest.accuracy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {pest.samples}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              System Requirements & Deployment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Minimum Requirements</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• CPU: Intel i5 or equivalent</li>
                  <li>• RAM: 8GB minimum, 16GB recommended</li>
                  <li>• Storage: 2GB free space</li>
                  <li>• GPU: Optional (CUDA-compatible)</li>
                  <li>• Network: Stable internet connection</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Deployment Options</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Web Application (React/Django)</li>
                  <li>• Mobile App (iOS/Android)</li>
                  <li>• API Integration</li>
                  <li>• Edge Computing Devices</li>
                  <li>• Cloud-based Service</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalPage;