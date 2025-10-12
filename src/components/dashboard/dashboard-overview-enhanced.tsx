'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, ImageIcon, AlertTriangle, Award, Activity } from 'lucide-react';
import { DashboardStats, ActivityItem, KPIData, AlertSummary } from '@/lib/types/dashboard';
import { cn } from '@/lib/utils';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface DashboardOverviewProps {
  stats: DashboardStats;
  activities: ActivityItem[];
  kpis: KPIData[];
  alerts: AlertSummary[];
}

const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  trend, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  value: string | number; 
  trend?: { value: number; up: boolean };
  description?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          {trend.up ? (
            <TrendingUp className="h-3 w-3 text-green-600" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-600" />
          )}
          <span className={trend.up ? 'text-green-600' : 'text-red-600'}>
            {Math.abs(trend.value)}%
          </span>
          {description || 'from last week'}
        </p>
      )}
    </CardContent>
  </Card>
);

const ActivityFeedItem = ({ item }: { item: ActivityItem }) => {
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return '⚠️';
      case 'upload': return '📤';
      case 'analysis': return '🔍';
      case 'export': return '📊';
      default: return '📝';
    }
  };

  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-0">
      <div className="text-2xl">{getTypeIcon(item.type)}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">{item.title}</p>
          {item.severity && (
            <Badge variant="outline" className={cn('text-xs', getSeverityColor(item.severity))}>
              {item.severity}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(item.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

const KPIChart = ({ data }: { data: KPIData }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-sm font-medium">{data.label}</CardTitle>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">{data.value}</span>
        <span className={cn(
          'text-xs flex items-center gap-1',
          data.trend === 'up' ? 'text-green-600' : data.trend === 'down' ? 'text-red-600' : 'text-gray-600'
        )}>
          {data.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : 
           data.trend === 'down' ? <TrendingDown className="h-3 w-3" /> : null}
          {Math.abs(data.change)}%
        </span>
      </div>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={data.data}>
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={data.trend === 'up' ? '#22c55e' : data.trend === 'down' ? '#ef4444' : '#6b7280'}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const AlertCard = ({ alert }: { alert: AlertSummary }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <Card className={cn('border-l-4', getSeverityColor(alert.severity))}>
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className={cn(
            'h-5 w-5 flex-shrink-0',
            alert.severity === 'critical' ? 'text-red-600' :
            alert.severity === 'high' ? 'text-orange-600' :
            alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
          )} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-xs">
                {alert.cropType}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {alert.status}
              </Badge>
            </div>
            <p className="text-sm font-medium">{alert.message}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(alert.detectedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  stats,
  activities,
  kpis,
  alerts,
}) => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={ImageIcon}
          title="Images Analyzed"
          value={stats.imagesAnalyzed.toLocaleString()}
          trend={{ value: 12.5, up: stats.trendsUp }}
        />
        <StatCard
          icon={AlertTriangle}
          title="Active Alerts"
          value={stats.activeAlerts}
          trend={{ value: 8.2, up: false }}
          description="needs attention"
        />
        <StatCard
          icon={Award}
          title="Quality Score"
          value={`${stats.qualityScore}%`}
          trend={{ value: 2.1, up: true }}
        />
        <StatCard
          icon={Activity}
          title="Detection Rate"
          value="94.2%"
          trend={{ value: 1.5, up: true }}
        />
      </div>

      {/* KPI Charts */}
      <div className="grid gap-4 md:grid-cols-3">
        {kpis.map((kpi, idx) => (
          <KPIChart key={idx} data={kpi} />
        ))}
      </div>

      {/* Recent Alerts & Activity Feed */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Critical issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and updates</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto">
            {activities.map((activity) => (
              <ActivityFeedItem key={activity.id} item={activity} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
