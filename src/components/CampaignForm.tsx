'use client';

import { useState } from 'react';
import { CampaignFormData } from '@/types/mail';
import { useEnv } from '@/contexts/EnvContext';

export default function CampaignForm({fetchCampaigns}: {fetchCampaigns: () => void}) {
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
    const data: CampaignFormData = {
      subject: formData.get('subject') as string,
      previewText: formData.get('previewText') as string,
      templateId: formData.get('templateId') as string,
      name: formData.get('name') as string,
      apiKey: envVars.API_KEY,
      server: envVars.SERVER,
      listId: envVars.LIST_ID,
      replyToEmail: envVars.REPLY_TO_EMAIL,
    };

    try {
      const response = await fetch('/api/campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error);
      setMessage('Campaign sent successfully!');
      fetchCampaigns()
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <div>
        <label htmlFor="subject" className="block text-sm font-medium">
          Subject Line
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="previewText" className="block text-sm font-medium">
          Preview Text
        </label>
        <input
          type="text"
          id="previewText"
          name="previewText"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="templateId" className="block text-sm font-medium">
          Template ID
        </label>
        <input
          type="text"
          id="templateId"
          name="templateId"
          value={11102417}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          From Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Campaign'}
      </button>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
} 