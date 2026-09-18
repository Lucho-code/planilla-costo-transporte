import React from 'react';
import { motion } from 'motion/react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from 'recharts';
import { AnimatedCounter } from './AnimatedCounter';

export interface ChartComparisonData {
  name: string;
  amount: number;
  color: string;
  fillOpacity?: number;
  description: string;
}

interface ModuleComparisonChartProps {
  moduleNumber: number;
  variableCost: number;
  fixedCost: number;
  suggestedTariff: number;
  unitLabel?: string;
  tripContextLabel?: string;
}

export const ModuleComparisonChart: React.FC<ModuleComparisonChartProps> = ({
  moduleNumber,
  variableCost,
  fixedCost,
  suggestedTariff,
  unitLabel = '$',
  tripContextLabel = 'Valores comparados de la operación',
}) => {
  const totalCost = variableCost + fixedCost;
  const marginAmount = Math.max(0, suggestedTariff - totalCost);
  const marginPct = totalCost > 0 ? ((suggestedTariff - totalCost) / totalCost) * 100 : 0;

  const data: ChartComparisonData[] = [
    {
      name: 'Costo Variable',
      amount: Math.round(variableCost),
      color: '#F5B301', // Amarillo Ámbar
      description: 'Gasoil, cubiertas, viáticos y peajes',
    },
    {
      name: 'Costo Fijo',
      amount: Math.round(fixedCost),
      color: '#F97316', // Naranja
      description: 'Chofer base, seguro, patente y estructura',
    },
    {
      name: 'Tarifa Sugerida',
      amount: Math.round(suggestedTariff),
      color: '#10B981', // Verde Esmeralda
      description: 'Flete objetivo con margen de rentabilidad',
    },
  ];

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-AR')}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as ChartComparisonData;
      const sharePct = suggestedTariff > 0 ? (item.amount / suggestedTariff) * 100 : 0;
      return (
        <div className="bg-[#15181E] text-white p-3 rounded-xl border border-[#3A4250] shadow-2xl text-xs font-sans max-w-[240px]">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-bold text-sm text-gray-100">{item.name}</span>
          </div>
          <div className="font-mono text-base font-black text-[#FFCE4D] mb-1">
            {formatCurrency(item.amount)}
          </div>
          <p className="text-[11px] text-gray-400 mb-2 leading-tight">
            {item.description}
          </p>
          <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-[10px] text-gray-400 font-mono">
            <span>Incidencia s/ Tarifa:</span>
            <span className="text-white font-bold">{sharePct.toFixed(1)}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      key={`chart-mod-${moduleNumber}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mt-4 pt-4 border-t border-gray-800 space-y-3"
    >
      {/* Chart Title and Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200">
              Relación de Costos vs. Tarifa Sugerida
            </h4>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {tripContextLabel}
          </p>
        </div>

        {/* Dynamic Margin Pill with animated numbers */}
        <div className="bg-[#3A4250]/70 px-2.5 py-1 rounded-lg text-right font-mono">
          <span className="text-[10px] text-gray-400 block uppercase">Margen estimado</span>
          <span className={`text-xs font-bold flex items-center justify-end gap-1 ${marginAmount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            <span>{marginAmount >= 0 ? '+' : ''}</span>
            <AnimatedCounter value={Math.round(marginAmount)} prefix="$" />
            <span className="text-[10px] text-gray-300">
              (<AnimatedCounter value={marginPct} decimals={1} suffix="%" />)
            </span>
          </span>
        </div>
      </div>

      {/* Recharts Bar Chart Container with entrance animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="w-full h-52 bg-[#0E1015] rounded-xl p-2.5 border border-[#3A4250]/80"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 15, right: 12, left: -10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#2A303C"
            />
            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#3A4250' }}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#3A4250' }}
              tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
            <Bar
              dataKey="amount"
              radius={[6, 6, 0, 0]}
              maxBarSize={56}
              isAnimationActive={true}
              animationDuration={450}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Legend / Metrics Summary Pills with Animated Counters */}
      <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
        <div className="bg-[#3A4250]/50 p-2 rounded-lg border border-gray-700/60">
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-[#F5B301]"></span>
            <span>Var:</span>
          </div>
          <span className="font-bold text-gray-200 mt-0.5 block truncate">
            <AnimatedCounter value={Math.round(variableCost)} prefix="$" />
          </span>
        </div>

        <div className="bg-[#3A4250]/50 p-2 rounded-lg border border-gray-700/60">
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
            <span>Fijo:</span>
          </div>
          <span className="font-bold text-gray-200 mt-0.5 block truncate">
            <AnimatedCounter value={Math.round(fixedCost)} prefix="$" />
          </span>
        </div>

        <div className="bg-[#3A4250]/50 p-2 rounded-lg border border-gray-700/60">
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span>Tarifa:</span>
          </div>
          <span className="font-bold text-emerald-400 mt-0.5 block truncate">
            <AnimatedCounter value={Math.round(suggestedTariff)} prefix="$" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
