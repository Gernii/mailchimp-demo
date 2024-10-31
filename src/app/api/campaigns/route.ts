import { initMailchimp } from '@/app/functions/extract-mailchimp';
import { NextResponse } from 'next/server';

export async function GET() {
    const { mailchimp } = await initMailchimp({
        apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
        server: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER,
        listId: process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID,
        replyToEmail: process.env.NEXT_PUBLIC_MAILCHIMP_REPLY_TO_EMAIL,
    });
  try {
    

    const response = await mailchimp.campaigns.list({
      count: 100,
      status: 'sent'
    });

    return NextResponse.json({
      campaigns: response.campaigns.map(campaign => ({
        id: campaign.id,
        webId: campaign.web_id,
        status: campaign.status,
        subject: campaign.settings.subject_line,
        previewText: campaign.settings.preview_text,
        sendTime: campaign.send_time,
        emailsSent: campaign.emails_sent,
      }))
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Error fetching campaigns', 
        details: error.message 
      },
      { status: 500 }
    );
  }
} 