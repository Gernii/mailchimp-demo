'use client';

import { useEnv } from '@/contexts/EnvContext';
import { useState } from 'react';

export default function ConfigForm() {
  const { envVars, updateEnvVars } = useEnv();
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState(envVars);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateEnvVars(formData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isEditing) {
    return (
      <div className="space-y-4 max-w-md mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Current Configuration</h2>
        {Object.entries(envVars).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="font-medium">{key}:</span>
            <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {value || '(not set)'}
            </span>
          </div>
        ))}
        <button
          onClick={() => setIsEditing(true)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Edit Configuration
        </button>
      </div>
    );
  }

  return (
    <details>
        <summary>Configs</summary>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Configuration</h2>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label htmlFor={key} className="block text-sm font-medium">
            {key}
          </label>
          <input
            type="text"
            id={key}
            name={key}
            value={value}
            onChange={handleChange}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black"
          />
        </div>
      ))}
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
    </details>
  );
} 