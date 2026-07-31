import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Card, Button, Chip, EmptyState, Skeleton } from '../primitives';

describe('primitives', () => {
  it('Card renders children and fires onClick', () => {
    const onClick = vi.fn();
    render(<Card onClick={onClick}>hello card</Card>);
    fireEvent.click(screen.getByText('hello card'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Button fires onClick when enabled', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    fireEvent.click(screen.getByText('Go'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Button does not fire onClick when disabled or loading', () => {
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick} disabled>D</Button>);
    fireEvent.click(screen.getByText('D'));
    rerender(<Button onClick={onClick} loading>D</Button>);
    fireEvent.click(screen.getByText('D'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('Chip renders its label and an optional icon', () => {
    const { container } = render(<Chip icon="check" active>Verified</Chip>);
    expect(screen.getByText('Verified')).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('EmptyState renders title, description and action', () => {
    render(
      <EmptyState
        icon="store"
        title="Nothing yet"
        description="Be the first to list"
        action={<Button>List</Button>}
      />,
    );
    expect(screen.getByText('Nothing yet')).toBeTruthy();
    expect(screen.getByText('Be the first to list')).toBeTruthy();
    expect(screen.getByText('List')).toBeTruthy();
  });

  it('Skeleton renders a pulsing placeholder', () => {
    const { container } = render(<Skeleton width={120} height={40} />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });
});
