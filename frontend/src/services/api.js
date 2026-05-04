const API_URL = '/api/activities';
const AUTH_URL = '/api/auth';

const getAuthHeaders = () => {
  try {
    const user = JSON.parse(localStorage.getItem('carbon_user'));
    if (user && user.token) {
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      };
    }
  } catch {
    // Corrupted localStorage — clear it
    localStorage.removeItem('carbon_user');
  }
  return { 'Content-Type': 'application/json' };
};

// Centralized response handler with 401 auto-logout
const handleResponse = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem('carbon_user');
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  let data;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = { message: await response.text() || `Request failed with status ${response.status}` };
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed (${response.status})`);
  }

  return data;
};

// Retry wrapper for network failures
const fetchWithRetry = async (url, options, retries = 2) => {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (i === retries) throw new Error('Network error. Please check your connection.');
      await new Promise(r => setTimeout(r, 1000 * (i + 1))); // Backoff
    }
  }
};

// ─── Auth ────────────────────────────────────────────────────

export const login = async (credentials) => {
  const response = await fetchWithRetry(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

export const register = async (userData) => {
  const response = await fetchWithRetry(`${AUTH_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

// ─── Activities ──────────────────────────────────────────────

export const fetchActivities = async () => {
  const response = await fetchWithRetry(API_URL, { headers: getAuthHeaders() });
  const data = await handleResponse(response);
  // Backend now returns { activities, pagination }
  const activities = data.activities || data;
  return Array.isArray(activities)
    ? activities.map(item => ({ ...item, id: item._id }))
    : [];
};

export const addActivity = async (activityData) => {
  // Strip client-side fields before sending
  const { id, deviceId, ...cleanData } = activityData;

  const response = await fetchWithRetry(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(cleanData),
  });
  const data = await handleResponse(response);
  return { ...data, id: data._id };
};

export const addBulkActivities = async (activitiesArray) => {
  const response = await fetchWithRetry(`${API_URL}/bulk`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(activitiesArray),
  });
  const data = await handleResponse(response);
  return data.map(item => ({ ...item, id: item._id }));
};

export const deleteActivity = async (id) => {
  const response = await fetchWithRetry(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

const SQUADS_URL = '/api/squads';

// ─── Squads ──────────────────────────────────────────────────

export const fetchSquads = async () => {
  const response = await fetchWithRetry(SQUADS_URL, { headers: getAuthHeaders() });
  return handleResponse(response);
};

export const createSquad = async (squadData) => {
  const response = await fetchWithRetry(SQUADS_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(squadData),
  });
  return handleResponse(response);
};

export const getSquadById = async (id) => {
  const response = await fetchWithRetry(`${SQUADS_URL}/${id}`, { headers: getAuthHeaders() });
  return handleResponse(response);
};

export const joinSquad = async (id) => {
  const response = await fetchWithRetry(`${SQUADS_URL}/${id}/join`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const getStats = async () => {
  const response = await fetchWithRetry(`${API_URL}/stats`, { headers: getAuthHeaders() });
  return handleResponse(response);
};
