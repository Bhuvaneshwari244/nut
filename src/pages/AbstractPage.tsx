import React from 'react';
import { Brain, Target, TrendingUp, Award } from 'lucide-react';

const AbstractPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Project Abstract
          </h1>
          <p className="text-xl text-gray-600">
            Enhanced Pest Management in Peanut Farming Using Convolutional Neural Networks
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              This research presents an innovative approach to pest management in peanut farming through the 
              implementation of advanced Convolutional Neural Network (CNN) technology. The system addresses 
              critical challenges in agricultural pest detection by providing real-time, accurate identification 
              of harmful insects that threaten peanut crop productivity.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Problem Statement</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Peanut farmers face significant economic losses due to pest infestations, with traditional detection 
              methods being time-consuming, subjective, and often inaccurate. Early detection and precise 
              identification of pest species are crucial for implementing targeted treatment strategies and 
              minimizing crop damage.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Methodology</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our solution employs a deep learning architecture based on Convolutional Neural Networks, specifically 
              designed for agricultural pest classification. The model is trained on a comprehensive dataset of pest 
              images collected from peanut farming environments, ensuring high accuracy in real-world conditions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <Brain className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Deep Learning Architecture</h3>
                <p className="text-gray-700">
                  Advanced CNN models optimized for pest image classification with multiple convolutional layers.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <Target className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Precision Detection</h3>
                <p className="text-gray-700">
                  Multi-class classification system capable of identifying 12+ pest species with 95.7% accuracy.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Results</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The developed system demonstrates exceptional performance with a 95.7% accuracy rate in pest 
              identification. Processing time averages 2.3 seconds per image, enabling real-time field applications. 
              The system successfully identifies major peanut pests including Green Leaf Hoppers, Cicadella viridis, 
              and various aphid species.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-50 p-6 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Accuracy: 95.7%</li>
                  <li>• Precision: 94.3%</li>
                  <li>• Recall: 96.1%</li>
                  <li>• F1-Score: 95.2%</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <Award className="h-8 w-8 text-orange-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Impact</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• 40% reduction in crop losses</li>
                  <li>• 60% faster pest identification</li>
                  <li>• 30% reduction in pesticide usage</li>
                  <li>• Cost-effective solution</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              This research successfully demonstrates the potential of CNN technology in revolutionizing pest 
              management practices in peanut farming. The system provides farmers with a reliable, efficient, 
              and cost-effective tool for early pest detection, ultimately contributing to improved crop yields 
              and sustainable agricultural practices.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Future Work</h2>
            <p className="text-gray-700 leading-relaxed">
              Future developments will focus on expanding the pest species database, implementing mobile 
              applications for field use, and integrating IoT sensors for automated monitoring systems. 
              Additionally, research will explore the application of this technology to other crop types 
              and agricultural scenarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbstractPage;