// API service for OTP verification
// Backend runs on http://localhost:5000

const API_BASE = 'http://localhost:3001/api';

// Send OTP to email
export const sendOtp = async (email) => {
  // GITHUB PREVIEW MOCK - auto success for static preview
  if (import.meta.env.PROD && !API_BASE.includes('localhost')) {
    return { success: true, message: 'OTP: 123456 (demo mode)' };
  }
  
  try {
    console.log('Sending OTP to:', email);
    const response = await fetch(`${API_BASE}/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(data.message || 'Failed to send OTP');
    }

    return data;
  } catch (error) {
    console.error('Send OTP error:', error);
    throw error;
  }
};

// Verify entered OTP
export const verifyOtp = async (email, otp) => {
  // GITHUB PREVIEW MOCK
  if (import.meta.env.PROD && !API_BASE.includes('localhost')) {
    if (otp === '123456') return { success: true };
    throw new Error('Demo OTP is 123456');
  }
  
  try {
    console.log('Verifying OTP for:', email);
    const response = await fetch(`${API_BASE}/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Verify API Error:', data);
      throw new Error(data.message || 'OTP verification failed');
    }

    return data;
  } catch (error) {
    console.error('Verify OTP error:', error);
    throw error;
  }
};

