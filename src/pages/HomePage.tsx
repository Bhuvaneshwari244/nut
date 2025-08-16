import React from 'react';
import { ArrowRight, Shield, Cpu, BarChart3, Users } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'home' | 'abstract' | 'detection' | 'technical') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Advanced Protection",
      description: "AI-powered pest detection with 95%+ accuracy rate"
    },
    {
      icon: <Cpu className="h-8 w-8 text-blue-600" />,
      title: "CNN Technology",
      description: "Deep learning models trained on thousands of pest images"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Real-time Analytics",
      description: "Monitor pest trends and treatment effectiveness"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Expert Support",
      description: "Agricultural specialists available for consultation"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Enhanced Pest Management
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-green-100">
              in Peanut Farming Using CNN
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-green-100">
              Revolutionary AI-powered pest detection system specifically designed for peanut crops. 
              Identify threats early, protect your harvest, and maximize agricultural productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('detection')}
                className="inline-flex items-center px-8 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200"
              >
                Start Detection
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => onNavigate('abstract')}
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg')] bg-cover bg-center"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose PeanutGuard AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge CNN technology provides farmers with the most accurate and efficient 
              pest detection solution available today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">95.7%</div>
              <div className="text-green-100">Detection Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-green-100">Pest Species Identified</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2.3s</div>
              <div className="text-green-100">Average Processing Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Protect Your Peanut Crops?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of farmers who trust PeanutGuard AI for their pest management needs.
          </p>
          <button
            onClick={() => onNavigate('detection')}
            className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-200"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;