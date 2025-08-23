import React, { useState, useCallback } from 'react';
import { Upload, Camera, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { detectPest, fetchWeather, fetchSatellite, sendAlert, submitFeedback } from '../lib/api';

interface DetectionResult {
  pestName: string;
  confidence: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
}

const DetectionPage: React.FC = () => {
  const { t } = useI18n();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [weather, setWeather] = useState<{ temp_c: number; rain_mm_next_24h: number; advice: string } | null>(null);
  const [satellite, setSatellite] = useState<{ ndvi: number; description: string } | null>(null);
  const [phone, setPhone] = useState<string>('');
  const [correctLabel, setCorrectLabel] = useState<string>('');
  const [comments, setComments] = useState<string>('');

  const pestDatabase: DetectionResult[] = [
    {
      pestName: "Cicadella viridis (Green Leaf Hopper)",
      confidence: 95.7,
      description: "A common sap-sucking insect that causes yellowing and stunted growth in peanut plants.",
      severity: "high",
      recommendations: [
        "Apply neem oil spray during early morning or evening",
        "Introduce natural predators like ladybugs",
        "Remove infected plant debris",
        "Monitor weekly for population changes"
      ]
    },
    {
      pestName: "Aphis craccivora (Cowpea Aphid)",
      confidence: 92.3,
      description: "Small, soft-bodied insects that cluster on leaves and stems, causing leaf curling and yellowing.",
      severity: "medium",
      recommendations: [
        "Use insecticidal soap solution",
        "Encourage beneficial insects",
        "Apply reflective mulch",
        "Regular monitoring required"
      ]
    },
    {
      pestName: "Thrips palmi (Melon Thrips)",
      confidence: 88.9,
      description: "Tiny insects that cause silver-white streaks on leaves and can transmit viral diseases.",
      severity: "high",
      recommendations: [
        "Use blue sticky traps",
        "Apply systemic insecticides",
        "Maintain field hygiene",
        "Early detection is crucial"
      ]
    },
    {
      pestName: "Spodoptera litura (Tobacco Caterpillar)",
      confidence: 94.1,
      description: "Destructive larvae that feed on leaves, causing extensive defoliation in peanut crops.",
      severity: "high",
      recommendations: [
        "Use pheromone traps for monitoring",
        "Apply Bt-based biopesticides",
        "Hand-picking of larvae",
        "Crop rotation recommended"
      ]
    }
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleFileSelection = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResult(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const simulateDetection = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const det = await detectPest(formData);
      setResult(det);
      // Try geolocation for context-aware advice
      let latitude = 20.5937, longitude = 78.9629;
      if (navigator.geolocation) {
        await new Promise<void>((resolve) => {
          navigator.geolocation.getCurrentPosition((pos) => {
            latitude = pos.coords.latitude;
            longitude = pos.coords.longitude;
            resolve();
          }, () => resolve());
        });
      }
      const w = await fetchWeather({ latitude, longitude });
      setWeather(w);
      const s = await fetchSatellite({ latitude, longitude });
      setSatellite(s);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      case 'medium': return <Info className="h-5 w-5" />;
      case 'low': return <CheckCircle className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('pest_detection_title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('pest_detection_subtitle')}
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragActive 
                ? 'border-green-500 bg-green-50' 
                : selectedFile 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-64 rounded-lg shadow-md"
                  />
                  <button
                    onClick={clearFile}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600">{selectedFile?.name}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Camera className="h-16 w-16 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {t('drop_image')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t('supports_types')}
                  </p>
                </div>
              </div>
            )}

            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {selectedFile && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={simulateDetection}
                disabled={isProcessing}
                className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors duration-200"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {t('processing')}
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    {t('detect_pest')}
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Detection Result</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Identified Pest</h3>
                  <p className="text-xl font-bold text-green-600 mb-2">{result.pestName}</p>
                  <p className="text-gray-700 mb-4">{result.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">Confidence:</span>
                      <span className="text-lg font-bold text-green-600">
                        {result.confidence.toFixed(1)}%
                      </span>
                    </div>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(result.severity)}`}>
                      {getSeverityIcon(result.severity)}
                      <span className="capitalize">{result.severity} Risk</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Recommendations</h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                    <h3 className="text-lg font-semibold text-yellow-800">Important Notes</h3>
                  </div>
                  <ul className="text-yellow-800 space-y-2 text-sm">
                    <li>• Consult with agricultural experts before applying treatments</li>
                    <li>• Monitor weather conditions for optimal treatment timing</li>
                    <li>• Keep records of pest occurrences and treatments</li>
                    <li>• Consider integrated pest management approaches</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Next Steps</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">1</div>
                      <span>Document the location and extent of infestation</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">2</div>
                      <span>Implement recommended treatment measures</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">3</div>
                      <span>Monitor effectiveness and re-assess after 7-10 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather and Satellite Insights */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('weather_advice')}</h3>
                {weather ? (
                  <div className="text-sm text-gray-700 space-y-2">
                    <div>Temp: <span className="font-semibold">{weather.temp_c} °C</span></div>
                    <div>Rain (24h): <span className="font-semibold">{weather.rain_mm_next_24h} mm</span></div>
                    <div className="mt-2 text-gray-800">{weather.advice}</div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">—</div>
                )}
              </div>
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('satellite_ndvi')}</h3>
                {satellite ? (
                  <div className="text-sm text-gray-700 space-y-2">
                    <div>NDVI: <span className="font-semibold">{satellite.ndvi}</span></div>
                    <div className="mt-2 text-gray-800">{satellite.description}</div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">—</div>
                )}
              </div>
            </div>

            {/* Alerts and Feedback */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-lg border space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">{t('send_whatsapp')}</h3>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('phone_number')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
                <button
                  onClick={async () => {
                    if (!result || !phone) return;
                    try {
                      const text = `${result.pestName} (${result.confidence.toFixed(1)}%). ${weather ? weather.advice : ''}`;
                      await sendAlert({ to_phone: phone, message: text });
                      alert('Alert sent');
                    } catch (e) {
                      console.error(e);
                      alert('Failed to send alert');
                    }
                  }}
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                >
                  {t('send_whatsapp')}
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg border space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">{t('submit_feedback')}</h3>
                <input
                  type="text"
                  value={correctLabel}
                  onChange={(e) => setCorrectLabel(e.target.value)}
                  placeholder={t('correct_label')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder={t('comments')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-24"
                />
                <button
                  onClick={async () => {
                    try {
                      await submitFeedback({
                        image_id: selectedFile ? selectedFile.name : undefined,
                        predicted_label: result ? result.pestName : undefined,
                        correct_label: correctLabel || undefined,
                        comments: comments || undefined,
                      });
                      alert('Thanks for your feedback');
                      setCorrectLabel('');
                      setComments('');
                    } catch (e) {
                      console.error(e);
                      alert('Failed to submit feedback');
                    }
                  }}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                >
                  {t('submit_feedback')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectionPage;