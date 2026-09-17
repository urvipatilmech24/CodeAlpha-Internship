import React, { useState } from 'react';
import { getPredictions } from '../api';
import { Cpu, Sparkles } from 'lucide-react';

export default function PredictorForm() {

  const [formData, setFormData] = useState({
    tv: 150,
    radio: 25,
    newspaper: 10
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setPrediction(null);

    try {
      const response = await getPredictions(formData);
      setPrediction(response.data);
    } catch (error) {
      console.error(error);
      alert('Prediction failed. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

      <div className="flex items-center gap-3 mb-6">
        <Cpu className="w-7 h-7 text-cyan-400" />

        <div>
          <h2 className="text-xl font-semibold">
            Sales Prediction Engine
          </h2>

          <p className="text-sm text-slate-400">
            Enter advertising budgets to predict sales using Random Forest.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              TV Budget ($k)
            </label>

            <input
              type="number"
              value={formData.tv}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tv: parseFloat(e.target.value) || 0
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Radio Budget ($k)
            </label>

            <input
              type="number"
              value={formData.radio}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  radio: parseFloat(e.target.value) || 0
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Newspaper Budget ($k)
            </label>

            <input
              type="number"
              value={formData.newspaper}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  newspaper: parseFloat(e.target.value) || 0
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              min="0"
              required
            />
          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-3 rounded-lg"
        >
          <Sparkles className="w-5 h-5" />

          {loading ? 'Calculating...' : 'Predict Sales'}
        </button>

      </form>

      {prediction && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="bg-slate-800 rounded-lg p-5">
            <p className="text-sm text-slate-400">
              Predicted Sales
            </p>

            <p className="text-3xl font-bold text-cyan-400 mt-2">
              {prediction.predicted_sales_units}
            </p>

            <p className="text-sm text-slate-500">
              Thousand Units
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-5">
            <p className="text-sm text-slate-400">
              Estimated ROI
            </p>

            <p className="text-3xl font-bold text-green-400 mt-2">
              {prediction.estimated_roi_pct}%
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-5">
            <p className="text-sm text-slate-400">
              AI Strategy
            </p>

            <p className="text-sm text-white mt-2 leading-6">
              {prediction.strategy_insight}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}