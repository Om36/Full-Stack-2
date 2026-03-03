import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../components/ContactForm';

describe('ContactForm Component', () => {
  test('renders form elements', () => {
    render(<ContactForm />);
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('message-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    fireEvent.submit(screen.getByTestId('contact-form'));

    expect(screen.getByTestId('name-error')).toHaveTextContent('Name is required');
    expect(screen.getByTestId('email-error')).toHaveTextContent('Email is required');
    expect(screen.getByTestId('message-error')).toHaveTextContent('Message is required');
  });

  test('shows email validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByTestId('name-input'), 'John Doe');
    await user.type(screen.getByTestId('email-input'), 'invalid-email');
    fireEvent.change(screen.getByTestId('message-input'), { target: { value: 'Hello world' } });
    fireEvent.submit(screen.getByTestId('contact-form'));

    expect(screen.getByTestId('email-error')).toHaveTextContent('Email is invalid');
  });

  test('submits successfully with valid data', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByTestId('name-input'), 'John Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    fireEvent.change(screen.getByTestId('message-input'), { target: { value: 'Hello world' } });
    fireEvent.submit(screen.getByTestId('contact-form'));

    expect(screen.getByTestId('success-message')).toBeInTheDocument();
    expect(screen.getByText('Thank you for your message!')).toBeInTheDocument();
  });

  test('clears error when user starts typing', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Submit empty form to show errors
    await user.click(screen.getByTestId('submit-button'));
    expect(screen.getByTestId('name-error')).toBeInTheDocument();

    // Start typing in name field
    await user.type(screen.getByTestId('name-input'), 'J');

    // Error should be cleared
    expect(screen.queryByTestId('name-error')).not.toBeInTheDocument();
  });
});