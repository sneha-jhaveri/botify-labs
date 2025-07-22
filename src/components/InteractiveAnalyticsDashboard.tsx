import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Clock,
  Target,
  Zap,
  RefreshCw,
  Filter,
  Download,
  Eye,
  Calendar,
  Activity,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Play,
  Pause
} from 'lucide-react';

interface Metric {
  id: string;
  label: string;
  value: number;
  target: number;
  change: number;
  icon: any;
  color: string;
  unit: string;
}

interface ChartData {
  time: string;
  conversations: number;
  resolutions: number;
  satisfaction: number;
}

const InteractiveAnalyticsDashboard = () => {
  const [isLive, setIsLive] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [metrics, setMetrics] = useState<Metric[]>([
    { id: 'conversations', label: 'Conversations', value: 1247, target: 1500, change: 12.5, icon: MessageSquare, color: 'primary', unit: '' },
    { id: 'resolution', label: 'Resolution Rate', value: 94.2, target: 95, change: 2.1, icon: CheckCircle2, color: 'secondary', unit: '%' },
    { id: 'response', label: 'Avg Response Time', value: 1.2, target: 2.0, change: -15.3, icon: Clock, color: 'accent', unit: 's' },
    { id: 'satisfaction', label: 'Customer Satisfaction', value: 4.8, target: 4.5, change: 6.7, icon: Users, color: 'primary', unit: '/5' }
  ]);

  const [chartData, setChartData] = useState<ChartData[]>([
    { time: '00:00', conversations: 45, resolutions: 42, satisfaction: 4.6 },
    { time: '04:00', conversations: 23, resolutions: 21, satisfaction: 4.7 },
    { time: '08:00', conversations: 89, resolutions: 85, satisfaction: 4.8 },
    { time: '12:00', conversations: 156, resolutions: 148, satisfaction: 4.9 },
    { time: '16:00', conversations: 134, resolutions: 127, satisfaction: 4.7 },
    { time: '20:00', conversations: 98, resolutions: 92, satisfaction: 4.8 }
  ]);

  const timeframes = ['1h', '24h', '7d', '30d'];

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        setMetrics(prev => prev.map(metric => ({
          ...metric,
          value: metric.value + (Math.random() - 0.5) * (metric.value * 0.01),
          change: (Math.random() - 0.5) * 20
        })));

        // Update chart data
        setChartData(prev => {
          const newData = [...prev];
          const lastPoint = newData[newData.length - 1];
          const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          newData.push({
            time: newTime,
            conversations: lastPoint.conversations + Math.floor((Math.random() - 0.5) * 20),
            resolutions: lastPoint.resolutions + Math.floor((Math.random() - 0.5) * 18),
            satisfaction: 4.5 + Math.random() * 0.5
          });

          return newData.slice(-6); // Keep last 6 points
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isLive]);

  const generateReport = () => {
    // Simulate report generation
    alert('Analytics report generated! Check your downloads folder.');
  };

  const refreshData = () => {
    // Simulate data refresh
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      value: metric.target * (0.8 + Math.random() * 0.4),
      change: (Math.random() - 0.5) * 30
    })));
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-slate-900/50 to-blue-900/30 rounded-3xl border border-primary/20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-ai opacity-20" />
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">AI Analytics Dashboard</h3>
            <p className="text-white/70 text-sm">Real-time insights powered by AI</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Timeframe Selector */}
            <div className="flex bg-black/20 rounded-lg p-1">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-3 py-1 text-xs rounded transition-all ${
                    selectedTimeframe === timeframe 
                      ? 'bg-primary text-white' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>

            {/* Control Buttons */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsLive(!isLive)}
              className={`text-white border-white/20 ${isLive ? 'bg-green-500/20' : ''}`}
            >
              {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="ml-1">{isLive ? 'Live' : 'Start'}</span>
            </Button>

            <Button variant="outline" size="sm" onClick={refreshData} className="text-white border-white/20">
              <RefreshCw className="w-4 h-4" />
            </Button>

            <Button variant="outline" size="sm" onClick={generateReport} className="text-white border-white/20">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {metrics.map((metric) => {
            const IconComponent = metric.icon;
            const isPositiveChange = metric.change >= 0;
            const isOnTarget = metric.value >= metric.target;

            return (
              <div 
                key={metric.id}
                className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-black/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                    metric.color === 'primary' ? 'from-primary to-primary/80' :
                    metric.color === 'secondary' ? 'from-secondary to-secondary/80' :
                    'from-accent to-accent/80'
                  } flex items-center justify-center`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  {isLive && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-2xl font-bold text-white">
                    {metric.value.toFixed(metric.unit === '' ? 0 : 1)}{metric.unit}
                  </div>
                  <div className="text-xs text-white/60">{metric.label}</div>
                  
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center text-xs ${
                      isPositiveChange ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {isPositiveChange ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {Math.abs(metric.change).toFixed(1)}%
                    </div>
                    <div className={`text-xs ${isOnTarget ? 'text-green-400' : 'text-yellow-400'}`}>
                      Target: {metric.target}{metric.unit}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Visualization */}
        <div className="flex-1 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold">Performance Trends</h4>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-white/70">Conversations</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-white/70">Resolutions</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-white/70">Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Simple Chart Visualization */}
          <div className="relative h-32">
            <div className="absolute inset-0 flex items-end justify-between">
              {chartData.map((data, index) => (
                <div key={data.time} className="flex-1 flex flex-col items-center space-y-1">
                  {/* Conversations Bar */}
                  <div className="relative w-full max-w-[20px]">
                    <div 
                      className="bg-primary/30 rounded-t w-full transition-all duration-1000"
                      style={{ height: `${(data.conversations / 200) * 100}px` }}
                    />
                    <div 
                      className="bg-primary rounded-t w-full absolute bottom-0 transition-all duration-1000"
                      style={{ height: `${(data.resolutions / 200) * 100}px` }}
                    />
                  </div>
                  
                  {/* Time Label */}
                  <div className="text-xs text-white/50 transform -rotate-45">
                    {data.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="mt-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3 border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-white">AI Insights</span>
            </div>
            <p className="text-xs text-white/80">
              {isLive 
                ? "📈 Peak activity detected. Response time improved by 15% in the last hour."
                : "💡 Click 'Start Live' to see real-time AI insights and predictions."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveAnalyticsDashboard;