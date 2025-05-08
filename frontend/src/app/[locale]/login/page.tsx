'use client';  // Mark this file as a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter from next/navigation
import { useTranslations } from 'next-intl';  // Import useTranslations for i18n
import Link from 'next/link';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const t = useTranslations('login');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send a request to the backend to verify credentials
    const locale = window.location.pathname.split('/')[1];  // Extract 'en' or 'tr' from URL
    const response = await fetch(`http://localhost:8080/${locale}/login`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // Login successful, redirect to home page
      const data = await response.json();
      localStorage.setItem('userId', data.username);
      router.push(`/${locale}`);
    } else {
      // Handle login failure (show error)
      setError(t('error'));
    }
  };

  return (
    <div>
      <h1>{t('title')}</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">{t('username')}</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">{t('password')}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{t('loginButton')}</button>
      </form>
      <div>
        <Link href="/forgot-password">{t('forgotPassword')}</Link>
      </div>
    </div>
  );
};

export default LoginPage;
