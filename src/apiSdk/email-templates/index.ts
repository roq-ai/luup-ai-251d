import axios from 'axios';
import queryString from 'query-string';
import { EmailTemplateInterface, EmailTemplateGetQueryInterface } from 'interfaces/email-template';
import { GetQueryInterface } from '../../interfaces';

export const getEmailTemplates = async (query?: EmailTemplateGetQueryInterface) => {
  const response = await axios.get(`/api/email-templates${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEmailTemplate = async (emailTemplate: EmailTemplateInterface) => {
  const response = await axios.post('/api/email-templates', emailTemplate);
  return response.data;
};

export const updateEmailTemplateById = async (id: string, emailTemplate: EmailTemplateInterface) => {
  const response = await axios.put(`/api/email-templates/${id}`, emailTemplate);
  return response.data;
};

export const getEmailTemplateById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/email-templates/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEmailTemplateById = async (id: string) => {
  const response = await axios.delete(`/api/email-templates/${id}`);
  return response.data;
};
