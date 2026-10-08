import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import emailjs from '@emailjs/browser';
jest.mock('@emailjs/browser', () => ({
  send: jest.fn()
}));
const renderApp = () => render(<MemoryRouter initialEntries={['/home']}><App /></MemoryRouter>);
test('services expand and collapse accessibly', () => {
  renderApp();
  const website = screen.getByRole('button', {
    name: /02. Website Design/
  });
  const ui = screen.getByRole('button', {
    name: /01. UI\/UX Design/
  });
  expect(website).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(ui);
  expect(ui).toHaveAttribute('aria-expanded', 'true');
  expect(website).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(ui);
  expect(ui).toHaveAttribute('aria-expanded', 'false');
});
test('all projects can be shown and collapsed', () => {
  renderApp();
  expect(screen.queryByRole('heading', {
    name: 'FitTrack'
  })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', {
    name: /View all projects/
  }));
  expect(screen.getByRole('heading', {
    name: 'FitTrack'
  })).toBeInTheDocument();
  expect(screen.getByRole('heading', {
    name: 'LM'
  })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', {
    name: /Show selected work/
  }));
  expect(screen.queryByRole('heading', {
    name: 'FitTrack'
  })).not.toBeInTheDocument();
});
test('mobile menu closes after selecting a section', () => {
  renderApp();
  const toggle = screen.getByRole('button', {
    name: /Menu/
  });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(screen.getByRole('link', {
    name: 'Services'
  }));
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

function fillForm() {
  fireEvent.change(screen.getByLabelText('First name'), {
    target: {
      value: 'Test'
    }
  });
  fireEvent.change(screen.getByLabelText('Last name'), {
    target: {
      value: 'Visitor'
    }
  });
  fireEvent.change(screen.getByLabelText('Email address'), {
    target: {
      value: 'test@example.com'
    }
  });
  fireEvent.change(screen.getByLabelText('Tell me about your project'), {
    target: {
      value: 'A portfolio project.'
    }
  });
}

test('contact submits full name and resets after success', async () => {
  emailjs.send.mockResolvedValueOnce({
    status: 200
  });
  renderApp();
  fillForm();
  fireEvent.click(screen.getByRole('button', {
    name: /Send message/
  }));
  expect(await screen.findByText('Thank you! Your message has been sent.')).toBeInTheDocument();
  expect(emailjs.send).toHaveBeenLastCalledWith(expect.any(String), expect.any(String), expect.objectContaining({
    from_name: 'Test Visitor',
    from_email: 'test@example.com',
    message: 'A portfolio project.'
  }), expect.any(String));
  expect(screen.getByLabelText('Last name')).toHaveValue('');
});
test('contact keeps entered values after a delivery failure', async () => {
  emailjs.send.mockRejectedValueOnce(new Error('Network failure'));
  renderApp();
  fillForm();
  fireEvent.click(screen.getByRole('button', {
    name: /Send message/
  }));
  await waitFor(() => expect(screen.getByText(/Your message could not be sent/)).toBeInTheDocument());
  expect(screen.getByLabelText('Last name')).toHaveValue('Visitor');
  expect(screen.getByRole('button', {
    name: /Send message/
  })).toBeEnabled();
});

test('specialties ribbon can be paused and resumed', () => {
  renderApp();
  const pause = screen.getByRole('button', { name: 'Pause specialties ribbon' });
  fireEvent.click(pause);
  expect(document.querySelector('.service-ribbon')).toHaveClass('is-paused');
  fireEvent.click(screen.getByRole('button', { name: 'Resume specialties ribbon' }));
  expect(document.querySelector('.service-ribbon')).not.toHaveClass('is-paused');
});
