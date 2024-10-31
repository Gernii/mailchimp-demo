'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface ConfigContextType {
  config: {
    MAILCHIMP_API_KEY: string;
    MAILCHIMP_SERVER: string;
    MAILCHIMP_LIST_ID: string;
    REPLY_TO_EMAIL: string;
  };
  updateConfig: (newConfig: Partial<ConfigContextType['config']>) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState({
    MAILCHIMP_API_KEY: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY || '',
    MAILCHIMP_SERVER: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER || '',
    MAILCHIMP_LIST_ID: process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID || '',
    REPLY_TO_EMAIL: process.env.NEXT_PUBLIC_REPLY_TO_EMAIL || '',
  });

  const updateConfig = async (newConfig: Partial<ConfigContextType['config']>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
} 