const API_BASE = '/api';

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export function login(email, password) {
  return request('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return request('/users/logout', { method: 'GET' });
}

export function signup(name, email, password, passwordConfirm) {
  return request('/users/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, passwordConfirm }),
  });
}

export function forgotPassword(email) {
  return request('/users/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(token, password, passwordConfirm) {
  return request(`/users/reset-password/${token}`, {
    method: 'PATCH',
    body: JSON.stringify({ password, passwordConfirm }),
  });
}

export function updatePassword(currentPassword, newPassword, newPasswordConfirm) {
  return request('/users/update-password', {
    method: 'PATCH',
    body: JSON.stringify({ currentPassword, newPassword, newPasswordConfirm }),
  });
}

export function updateMe(formData) {
  return request('/users/update-me', {
    method: 'PATCH',
    body: formData,
    headers: {},
  });
}

export function getMe() {
  return request('/users/me', { method: 'GET' });
}

export function getAllTours() {
  return request('/tours', { method: 'GET' });
}

export function getTour(slug) {
  return request(`/tours?slug=${slug}`, { method: 'GET' });
}

export function getCheckoutSession(tourId) {
  return request(`/bookings/checkout-session/${tourId}`, { method: 'GET' });
}

export function getMyBookings() {
  return request('/bookings', { method: 'GET' });
}
