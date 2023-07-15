interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Sales Representative', 'Marketing Manager', 'Team Member', 'Business Owner'],
  tenantName: 'Organization',
  applicationName: 'Luup.ai',
  addOns: ['file', 'notifications'],
};
