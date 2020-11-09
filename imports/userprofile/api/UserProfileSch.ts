export const userProfileSch = {
  photo: {
    type: String,
    label: 'Photo',
    defaultValue: '',
    optional: true,
    isImage: true,
  },
  username: {
    type: String,
    label: 'User Name',
    defaultValue: '',
    optional: true,

  },
  email: {
    type: String,
    label: 'Email',
    defaultValue: '',
    optional: false,

  },
  roles: {
    type: [ String ],
    label: 'Access profile',
    defaultValue: [],
    optional: false,
    componentName: 'ChipSelect',
    options: [
        {
        value:'Administrador',label:'Admnistrador',
        },
      {
        value:'Usuario',label:'Usuário',
      },
    ],

  },
};

export interface UserProfile {
  _id?: string;
  photo: string;
  username: string;
  email: string;
  roles: [string];
  createdat: Date;
  updatedat: Date;
  createdby: string;
}
