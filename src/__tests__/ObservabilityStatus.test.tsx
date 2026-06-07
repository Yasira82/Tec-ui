import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ObservabilityStatus, ServiceHealthDot } from '../payment/ObservabilityStatus';

describe('ObservabilityStatus', () => {
  it('renders success rate', () => {
    render(React.createElement(ObservabilityStatus, { successRate: 98.5 }));
    expect(screen.getByText(/98\.5%/)).toBeTruthy();
  });

  it('renders default label', () => {
    render(React.createElement(ObservabilityStatus, { successRate: 95 }));
    expect(screen.getByText('Success Rate')).toBeTruthy();
  });

  it('renders custom label', () => {
    render(React.createElement(ObservabilityStatus, { successRate: 90, label: 'Payment Rate' }));
    expect(screen.getByText('Payment Rate')).toBeTruthy();
  });

  it('renders total transactions when provided', () => {
    render(React.createElement(ObservabilityStatus, { successRate: 95, total: 1200 }));
    expect(screen.getByText(/1200 txns/)).toBeTruthy();
  });

  it('omits total when not provided', () => {
    render(React.createElement(ObservabilityStatus, { successRate: 95 }));
    expect(screen.queryByText(/txns/)).toBeNull();
  });

  it('uses green color for ≥95%', () => {
    const { container } = render(
      React.createElement(ObservabilityStatus, { successRate: 97 })
    );
    const dot = container.querySelector('span') as HTMLElement;
    expect(dot?.style.background).toBe('#4ade80');
  });

  it('uses yellow color for 80–95%', () => {
    const { container } = render(
      React.createElement(ObservabilityStatus, { successRate: 85 })
    );
    const dot = container.querySelector('span') as HTMLElement;
    expect(dot?.style.background).toBe('#facc15');
  });

  it('uses red color for <80%', () => {
    const { container } = render(
      React.createElement(ObservabilityStatus, { successRate: 70 })
    );
    const dot = container.querySelector('span') as HTMLElement;
    expect(dot?.style.background).toBe('#f87171');
  });
});

describe('ServiceHealthDot', () => {
  it('renders label', () => {
    render(React.createElement(ServiceHealthDot, { healthy: true, label: 'Auth Service' }));
    expect(screen.getByText('Auth Service')).toBeTruthy();
  });

  it('renders green dot for healthy=true', () => {
    const { container } = render(
      React.createElement(ServiceHealthDot, { healthy: true, label: 'Svc' })
    );
    const dot = container.querySelector('span') as HTMLElement;
    expect(dot?.style.background).toBe('#4ade80');
  });

  it('renders red dot for healthy=false', () => {
    const { container } = render(
      React.createElement(ServiceHealthDot, { healthy: false, label: 'Svc' })
    );
    const dot = container.querySelector('span') as HTMLElement;
    expect(dot?.style.background).toBe('#f87171');
  });

  it('renders latency when provided', () => {
    render(React.createElement(ServiceHealthDot, { healthy: true, label: 'Svc', latency: 42 }));
    expect(screen.getByText('42ms')).toBeTruthy();
  });

  it('omits latency when not provided', () => {
    render(React.createElement(ServiceHealthDot, { healthy: true, label: 'Svc' }));
    expect(screen.queryByText(/ms/)).toBeNull();
  });
});
