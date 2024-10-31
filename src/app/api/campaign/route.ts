import { initMailchimp } from '@/app/functions/extract-mailchimp';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  const body  = await request.json();
  const { subject, previewText, templateId, name } = body
  const {mailchimp, listId, replyToEmail} = await initMailchimp(body)
  try {



    const campaignResponse = await mailchimp.campaigns.create({
      type: 'regular',
      recipients: { list_id:listId! },
      settings: {
        subject_line: subject,
        preview_text: previewText,
        from_name: name,
        reply_to: replyToEmail,
        template_id: Number(templateId),
      },
    });

    await mailchimp.campaigns.send(campaignResponse.id);

    return NextResponse.json({
      message: 'Campaign created and sent successfully',
      campaignId: campaignResponse.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Error creating or sending campaign', 
        details: error.message 
      },
      { status: 500 }
    );
  }
} 