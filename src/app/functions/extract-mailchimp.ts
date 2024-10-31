import { ConfigFormData } from '@/types/mail';
import mailchimp from '@mailchimp/mailchimp_marketing';

export const initMailchimp = async (body: any) : Promise<Pick<ConfigFormData, 'listId' | 'replyToEmail'> & {mailchimp: typeof mailchimp}> => {
const {apiKey, server, listId, replyToEmail} = body

mailchimp.setConfig({
    apiKey,
    server,
  });
return {mailchimp, listId, replyToEmail}
}

