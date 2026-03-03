import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../components/Dashboard';

describe('Dashboard Component - Snapshot Tests', () => {
  test('renders loading state correctly', () => {
    const { container } = render(<Dashboard status="loading" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders error state correctly', () => {
    const { container } = render(<Dashboard status="error" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders empty state correctly', () => {
    const { container } = render(<Dashboard status="empty" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders loaded state with data correctly', () => {
    const mockData = [
      { title: 'Item 1', value: 'Value 1' },
      { title: 'Item 2', value: 'Value 2' },
      { title: 'Item 3', value: 'Value 3' }
    ];
    const { container } = render(<Dashboard status="loaded" data={mockData} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders loaded state with empty data array correctly', () => {
    const { container } = render(<Dashboard status="loaded" data={[]} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});