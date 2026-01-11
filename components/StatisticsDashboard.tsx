import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DailyStat } from '../types';
import { Flame, Clock, Calendar } from 'lucide-react';

interface StatisticsDashboardProps {
  stats: DailyStat[];
  streak: number;
  onClose: () => void;
}

const StatisticsDashboard: React.FC<StatisticsDashboardProps> = ({ stats, streak, onClose }) => {
  const totalMinutes = stats.reduce((acc, cur) => acc + cur.minutes, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Thống kê Sức khỏe</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Theo dõi sự kiên trì của bạn</p>
          </div>
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>

        <div className="p-6 overflow-y-auto no-scrollbar">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-2xl border border-orange-100 dark:border-orange-900/30 flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 mb-2 text-orange-500">
                <Flame className="w-5 h-5 fill-current" />
                <span className="font-bold text-sm uppercase tracking-wider">Chuỗi ngày</span>
              </div>
              <span className="text-4xl font-bold text-slate-800 dark:text-slate-100">{streak}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">ngày liên tiếp</span>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 mb-2 text-blue-500">
                <Clock className="w-5 h-5" />
                <span className="font-bold text-sm uppercase tracking-wider">Tuần này</span>
              </div>
              <span className="text-4xl font-bold text-slate-800 dark:text-slate-100">{totalMinutes}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">phút tịnh tâm</span>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-2">
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-slate-400" />
              Biểu đồ 7 ngày qua
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    dy={10}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="minutes" radius={[6, 6, 6, 6]}>
                    {stats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.minutes > 0 ? '#60a5fa' : '#e2e8f0'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-slate-400 mt-4 italic">
              *Đơn vị: Phút
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;