'use client';

import { useState } from 'react';
import { SubscribeFormData } from '@/types/mail';
import { useEnv } from '@/contexts/EnvContext';

export const  SubscribeForm = ({fetchMembers}: {fetchMembers: () => void}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { envVars } = useEnv();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const formData = new FormData(e.currentTarget);

    const data: SubscribeFormData = {
      email: formData.get('email') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      apiKey: envVars.API_KEY,
      server: envVars.SERVER,
      listId: envVars.LIST_ID,
      replyToEmail: envVars.REPLY_TO_EMAIL,
    };

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error);
      setMessage('Subscribed successfully!');
      fetchMembers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black"
        />
      </div>

      <div>
        <label htmlFor="firstName" className="block text-sm font-medium">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  text-black"
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Subscribing...' : 'Subscribe'}
      </button>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
} 