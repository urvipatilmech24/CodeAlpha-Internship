import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export default function SalesCharts({ overview }) {
  if (!overview) return null;

  const channelData = [
    {
      channel: 'TV',
      spend: overview.metrics.channel_totals.TV
    },
    {
      channel: 'Radio',
      spend: overview.metrics.channel_totals.Radio
    },
    {
      channel: 'Newspaper',
      spend: overview.metrics.channel_totals.Newspaper
    }
  ];

  const correlations = overview.metrics.correlations;

  const correlationData = Object.entries(correlations)
    .filter(([key]) => key !== 'Sales')
    .map(([channel, value]) => ({
      channel,
      correlation: value
    }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Advertising Spend */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

        <h2 className="text-lg font-semibold mb-5">
          Advertising Spend by Channel
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="channel"
                stroke="#94a3b8"
              />

              <YAxis
                stroke="#94a3b8"
              />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="spend"
                name="Spend ($k)"
                fill="#22d3ee"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Correlation */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

        <h2 className="text-lg font-semibold mb-5">
          Correlation with Sales
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={correlationData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="channel"
                stroke="#94a3b8"
              />

              <YAxis
                domain={[-1, 1]}
                stroke="#94a3b8"
              />

              <Tooltip />

              <Bar
                dataKey="correlation"
                name="Correlation"
                fill="#a78bfa"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}