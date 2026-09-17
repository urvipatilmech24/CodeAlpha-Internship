import React, { useEffect, useState } from 'react';
import { BarChart3, DollarSign, Radio, Newspaper, Tv } from 'lucide-react';
import { getOverview } from './api';
import MetricCard from './components/MetricCard';
import SalesCharts from './components/SalesCharts';
import PredictorForm from './components/PredictorForm';

export default function App() {
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOverview();
        setOverview(response.data);
      } catch (err) {
        console.error(err);
        setError('Unable to connect to the backend.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-2xl font-bold">
                Sales & Advertising Prediction Engine
              </h1>
              <p className="text-sm text-slate-400">
                Machine Learning Dashboard for Sales Forecasting & ROI Optimization
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Backend status */}
        {error ? (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
            <p className="text-sm mt-1">
              Make sure your FastAPI backend is running on port 8000.
            </p>
          </div>
        ) : (
          <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-green-300">
            ✓ API Connected
          </div>
        )}

        {/* Metrics */}
        {overview && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

              <MetricCard
                title="Total Campaigns"
                value={overview.metrics.total_campaigns}
                subtitle="Advertising records"
                icon={BarChart3}
                colorClass="border border-slate-700"
              />

              <MetricCard
                title="Average Sales"
                value={overview.metrics.avg_sales}
                subtitle="Thousand units"
                icon={DollarSign}
                colorClass="border border-slate-700"
              />

              <MetricCard
                title="TV Spend"
                value={`$${overview.metrics.channel_totals.TV}k`}
                subtitle="Total advertising spend"
                icon={Tv}
                colorClass="border border-slate-700"
              />

              <MetricCard
                title="Radio Spend"
                value={`$${overview.metrics.channel_totals.Radio}k`}
                subtitle="Total advertising spend"
                icon={Radio}
                colorClass="border border-slate-700"
              />

            </div>

            {/* Analytics */}
            <SalesCharts overview={overview} />

          </>
        )}

        {/* Prediction */}
        <div className="mt-8">
          <PredictorForm />
        </div>

      </main>
    </div>
  );
}