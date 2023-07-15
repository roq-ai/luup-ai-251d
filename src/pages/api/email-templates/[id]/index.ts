import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { emailTemplateValidationSchema } from 'validationSchema/email-templates';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.email_template
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEmailTemplateById();
    case 'PUT':
      return updateEmailTemplateById();
    case 'DELETE':
      return deleteEmailTemplateById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEmailTemplateById() {
    const data = await prisma.email_template.findFirst(convertQueryToPrismaUtil(req.query, 'email_template'));
    return res.status(200).json(data);
  }

  async function updateEmailTemplateById() {
    await emailTemplateValidationSchema.validate(req.body);
    const data = await prisma.email_template.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEmailTemplateById() {
    const data = await prisma.email_template.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}