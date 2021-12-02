const roles = [
  {
    role_name: 'admin',
    role_description: 'can create organizations, organization_admins, etc.'
  },
  {
    role_name: 'organization_admin',
    role_description: 'can update their organization, enroll more organization_admins, etc.'
  }
]

module.exports = roles;