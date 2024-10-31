import { initMailchimp } from '@/app/functions/extract-mailchimp';
import { NextResponse } from 'next/server';



export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName, lastName } = body;
    const {mailchimp, listId} = await initMailchimp(body)

    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    });

    return NextResponse.json({ 
      message: 'Contact added successfully', 
      contactId: response 
    });
  } catch (error: any) {
    if(error instanceof Error){
      console.log(error);
      
      return NextResponse.json(
        { 
          error: 'Error adding contact', 
          details: error.message 
        },
        { status: 500 }
      );
    }
    
  }
} 