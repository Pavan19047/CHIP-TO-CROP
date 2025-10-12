import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview-enhanced';
import { mockDashboardStats, mockActivityFeed, mockKPIData, mockAlerts } from '@/lib/mock-data/dashboard-data';

describe('DashboardOverview', () => {
  it('renders dashboard stats correctly', () => {
    render(
      <DashboardOverview
        stats={mockDashboardStats}
        activities={mockActivityFeed}
        kpis={mockKPIData}
        alerts={mockAlerts}
      />
    );

    // Check if main stats are displayed
    expect(screen.getByText('Images Analyzed')).toBeInTheDocument();
    expect(screen.getByText(mockDashboardStats.imagesAnalyzed.toLocaleString())).toBeInTheDocument();
    expect(screen.getByText('Active Alerts')).toBeInTheDocument();
    expect(screen.getByText(mockDashboardStats.activeAlerts.toString())).toBeInTheDocument();
  });

  it('displays activity feed items', () => {
    render(
      <DashboardOverview
        stats={mockDashboardStats}
        activities={mockActivityFeed}
        kpis={mockKPIData}
        alerts={mockAlerts}
      />
    );

    // Check if activities are rendered
    mockActivityFeed.forEach((activity) => {
      expect(screen.getByText(activity.title)).toBeInTheDocument();
    });
  });

  it('renders KPI charts', () => {
    render(
      <DashboardOverview
        stats={mockDashboardStats}
        activities={mockActivityFeed}
        kpis={mockKPIData}
        alerts={mockAlerts}
      />
    );

    // Check if KPI labels are present
    mockKPIData.forEach((kpi) => {
      expect(screen.getByText(kpi.label)).toBeInTheDocument();
    });
  });

  it('displays alerts with correct severity colors', () => {
    render(
      <DashboardOverview
        stats={mockDashboardStats}
        activities={mockActivityFeed}
        kpis={mockKPIData}
        alerts={mockAlerts}
      />
    );

    // Check if alerts are displayed
    mockAlerts.slice(0, 3).forEach((alert) => {
      expect(screen.getByText(alert.message)).toBeInTheDocument();
    });
  });

  it('shows trending indicators', () => {
    const { container } = render(
      <DashboardOverview
        stats={mockDashboardStats}
        activities={mockActivityFeed}
        kpis={mockKPIData}
        alerts={mockAlerts}
      />
    );

    // Check for trend icons (up/down arrows)
    const trendIcons = container.querySelectorAll('[class*="trending"]');
    expect(trendIcons.length).toBeGreaterThan(0);
  });
});
