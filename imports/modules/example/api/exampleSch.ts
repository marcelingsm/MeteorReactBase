export const exampleSch = {
  image: {
    type: String,
    label: 'Imagem',
    defaultValue: '',
    optional: true,
    isImage: true,
    optional: true,
  },
  title: {
    type: String,
    label: 'Título',
    defaultValue: '',
    optional: false,

  },
  description: {
    type: String,
    label: 'Descrição',
    defaultValue: '',
    optional: true,

  },
  contract:{
    type: [Object],
    label: 'Contratos',
    defaultValue: [],
    optional: true,
    subSchema: {
      name: {
        type: String,
        label:'Nome',
        defaultValue: '',
        optional: false,
      },
      description: {
        type: String,
        label:'Descrição',
        defaultValue: '',
        optional: false,
      },
    }
  },

};

export interface example {
  _id?: string;
  image: string;
  title: string;
  description: string;
  createdat: Date;
  updatedat: Date;
  createdby: string;
}
