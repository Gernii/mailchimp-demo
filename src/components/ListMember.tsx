'use client';

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

interface Member {
  id: string;
  email: string;
  status: string;
  firstName: string;
  lastName: string;
  timestamp: string;
}

export const ListMember = forwardRef((_, ref) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/members');
      if (!response.ok) throw new Error('Failed to fetch members');
      
      const data = await response.json();
      setMembers(data.members);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch members');
    } finally {
      setIsLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchMembers
  }))

  useEffect(() => {
    

    fetchMembers();
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
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {members.map((member) => (
            <tr key={member.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {member.firstName} {member.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {member.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  member.status === 'subscribed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {member.status}
                </span>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
})