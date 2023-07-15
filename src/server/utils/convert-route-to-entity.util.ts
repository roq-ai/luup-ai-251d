const mapping: Record<string, string> = {
  'email-templates': 'email_template',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
