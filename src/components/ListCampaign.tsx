'use client';

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

interface Campaign {
  id: string;
  webId: number;
  status: string;
  subject: string;
  previewText: string;
  sendTime: string;
  emailsSent: number;
}

export const ListCampaign = forwardRef((_, ref) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns');
      if (!response.ok) throw new Error('Failed to fetch campaigns');
      
      const data = await response.json();
      setCampaigns(data.campaigns);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch campaigns');
    } finally {
      setIsLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchCampaigns
  }));

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Preview Text
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Sent
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Recipients
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {campaign.subject}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {campaign.previewText || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  campaign.status === 'sent' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {campaign.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(campaign.sendTime).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {campaign.emailsSent}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

ListCampaign.displayName = 'ListCampaign'; 