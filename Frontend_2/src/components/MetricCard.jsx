import React from 'react';

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  colorClass = ''
}) {
  return (
    <div
      className={`bg-slate-900 p-6 rounded-xl shadow-lg ${colorClass}`}
    >
      <div className="flex items-center justify-between">

        <div>
          <h3 className="text-sm font-medium text-slate-400">
            {title}
          </h3>

          <p className="text-3xl font-bold text-white mt-2">
            {value}
          </p>

          <p className="text-sm text-slate-500 mt-1">
            {subtitle}
          </p>
        </div>

        {Icon && (
          <Icon className="h-10 w-10 text-cyan-400" />
        )}

      </div>
    </div>
  );
}