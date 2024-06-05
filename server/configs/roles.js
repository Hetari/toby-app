const roles = [
  {
    name: 'admin',
    permissions: [
      // 'admin',

      'read_record',
      'create_record',
      'update_record',
      'delete_record',

      // organization permissions
      'read_organization',
      'create_organization',
      'update_organization',
      'delete_organization',
    ],
  },
  {
    name: 'user',
    permissions: [
      // 'user',

      'read_record',
      'create_record',
      'update_record',
      'delete_record',

      // organization permissions
      'read_organization',
    ],
  },
];

export default roles;
