'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface EnvContextType {
  envVars: {
    API_KEY: string;
    SERVER: string;
    LIST_ID: string;
    REPLY_TO_EMAIL: string;
  };
  updateEnvVars: (newVars: Partial<EnvContextType['envVars']>) => void;
}

const EnvContext = createContext<EnvContextType | undefined>(undefined);

export function EnvProvider({ children }: { children: React.ReactNode }) {
  const [envVars, setEnvVars] = useState<EnvContextType['envVars']>({
    API_KEY: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY || '',
    SERVER: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER || '',
    LIST_ID: process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID || '',
    REPLY_TO_EMAIL: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL || '',
  });

  useEffect(() => {
    // Load initial values from localStorage if available
    const storedVars = localStorage.getItem('envVars');
    if (storedVars) {
      setEnvVars(JSON.parse(storedVars));
    }
  }, []);

  const updateEnvVars = (newVars: Partial<EnvContextType['envVars']>) => {
    setEnvVars(prev => {
      const updated = { ...prev, ...newVars };
      localStorage.setItem('envVars', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <EnvContext.Provider value={{ envVars, updateEnvVars }}>
      {children}
    </EnvContext.Provider>
  );
}

export function useEnv() {
  const context = useContext(EnvContext);
  if (context === undefined) {
    throw new Error('useEnv must be used within an EnvProvider');
  }
  return context;
} 