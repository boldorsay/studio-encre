  import type { Collection } from 'tinacms';


  const Page: Collection = {
    label: 'Pages',
    name: 'page',
    path: 'content/pages',
    format: 'mdx',
    ui: {
      router: ({ document }) => {
        const filepath = document._sys.breadcrumbs.join('/');
        if (filepath === 'home') {
          return '/';
        }
        return `/${filepath}`;
      },
    },
    fields: [
      {
        type: 'object',
        list: true,
        name: 'blocks',
        label: 'Sections',
        ui: {
          visualSelector: true,
        },
        templates: [

        ],
      },
    ],
  };

  export default Page;
