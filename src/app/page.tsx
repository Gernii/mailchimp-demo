"use client"

import {SubscribeForm} from '@/components/SubscribeForm';
import CampaignForm from '@/components/CampaignForm';
import ConfigForm from '@/components/ConfigForm';
import {ListMember} from '@/components/ListMember';
import {ListCampaign} from '@/components/ListCampaign';
import { useRef } from 'react';

export default function MailPage() {
  const listMemberRef = useRef<any>(null);
  const listCampaignRef = useRef<any>(null);

  const fetchMembers = () => {
    listMemberRef.current.fetchMembers();
  }

  const fetchCampaigns = () => {
    listCampaignRef.current.fetchCampaigns();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Mail Management</h1>
      <ConfigForm />
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Subscribe to Newsletter</h2>
          <SubscribeForm fetchMembers={fetchMembers} />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Send Campaign</h2>
          <CampaignForm fetchCampaigns={fetchCampaigns} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Subscribers List</h2>
        <ListMember ref={listMemberRef} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">Campaign History</h2>
        <ListCampaign ref={listCampaignRef} />
      </div>
    </div>
  );
} 
