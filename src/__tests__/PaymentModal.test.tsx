import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { PaymentModal } from '../payment/PaymentModal';

const base = {
  amount:  10,
  label:   'Buy Product',
  onClose: vi.fn(),
  onRetry: vi.fn(),
};

describe('PaymentModal — creating state', () => {
  it('shows "Preparing payment…" text', () => {
    render(React.createElement(PaymentModal, { ...base, status: 'creating' }));
    expect(screen.getByText(/Preparing payment/i)).toBeTruthy();
  });

  it('shows amount', () => {
    render(React.createElement(PaymentModal, { ...base, status: 'creating' }));
    expect(screen.getByText(/10π/)).toBeTruthy();
  });
});

describe('PaymentModal — paying state', () => {
  it('shows "Confirm in Pi Wallet…" text', () => {
    render(React.createElement(PaymentModal, { ...base, status: 'paying' }));
    expect(screen.getByText(/Confirm in Pi Wallet/i)).toBeTruthy();
  });
});

describe('PaymentModal — success state', () => {
  it('shows Payment Successful', () => {
    render(React.createElement(PaymentModal, { ...base, status: 'success' }));
    expect(screen.getByText(/Payment Successful/i)).toBeTruthy();
  });

  it('calls onClose when Done button clicked', () => {
    const onClose = vi.fn();
    render(React.createElement(PaymentModal, { ...base, status: 'success', onClose }));
    fireEvent.click(screen.getByText('Done'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop clicked', () => {
    const onClose = vi.fn();
    const { container } = render(
      React.createElement(PaymentModal, { ...base, status: 'success', onClose })
    );
    const backdrop = container.firstChild as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });
});

describe('PaymentModal — cancelled state', () => {
  it('shows Cancelled text', () => {
    render(React.createElement(PaymentModal, { ...base, status: 'cancelled' }));
    expect(screen.getByText('Cancelled')).toBeTruthy();
  });

  it('calls onRetry on Try Again', () => {
    const onRetry = vi.fn();
    render(React.createElement(PaymentModal, { ...base, status: 'cancelled', onRetry }));
    fireEvent.click(screen.getByText('Try Again'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Close button', () => {
    const onClose = vi.fn();
    render(React.createElement(PaymentModal, { ...base, status: 'cancelled', onClose }));
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('PaymentModal — error state', () => {
  it('shows Payment Failed text', () => {
    render(React.createElement(PaymentModal, { ...base, status: 'error' }));
    expect(screen.getByText('Payment Failed')).toBeTruthy();
  });

  it('shows custom error message', () => {
    render(React.createElement(PaymentModal, { ...base, status: 'error', message: 'Something went wrong' }));
    expect(screen.getByText('Something went wrong')).toBeTruthy();
  });

  it('calls onRetry on Try Again', () => {
    const onRetry = vi.fn();
    render(React.createElement(PaymentModal, { ...base, status: 'error', onRetry }));
    fireEvent.click(screen.getByText('Try Again'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Close button', () => {
    const onClose = vi.fn();
    render(React.createElement(PaymentModal, { ...base, status: 'error', onClose }));
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClose when backdrop clicked during paying state', () => {
    const onClose = vi.fn();
    const { container } = render(
      React.createElement(PaymentModal, { ...base, status: 'paying', onClose })
    );
    const backdrop = container.firstChild as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });
});
