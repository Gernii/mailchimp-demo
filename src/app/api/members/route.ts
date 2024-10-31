import { initMailchimp } from '@/app/functions/extract-mailchimp';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { mailchimp, listId } = await initMailchimp({
        apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
        server: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER,
        listId: process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID,
        replyToEmail: process.env.NEXT_PUBLIC_MAILCHIMP_REPLY_TO_EMAIL,
    });

  try {

    const response = await mailchimp.lists.getListMembersInfo(listId, {
      count: 100,
      status: 'subscribed'
    });

    return NextResponse.json({
      members: response.members.map((member: {id: string, email_address: string, status: string, merge_fields: {FNAME: string, LNAME: string}, timestamp_signup: string}) => ({
        id: member.id,
        email: member.email_address,
        status: member.status,
        firstName: member.merge_fields.FNAME,
        lastName: member.merge_fields.LNAME,
        timestamp: member.timestamp_signup
      }))
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Error fetching members', 
        details: error.message 
      },
      { status: 500 }
    );
  }
} 
