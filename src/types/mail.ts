export interface SubscribeFormData extends ConfigFormData {
  email: string;
  firstName: string;
  lastName: string;
}

export interface CampaignFormData extends ConfigFormData {
  subject: string;
  previewText: string;
  templateId: string;
  name: string;
} 

export interface ConfigFormData {
  apiKey: string;
  server: string;
  listId: string;
  replyToEmail?: string;
}