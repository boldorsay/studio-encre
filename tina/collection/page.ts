import type { Collection } from 'tinacms';

import { accordionBlocks } from '@/components/blocks/accordion';
import { bannerPaulBlocks } from '@/components/blocks/BannerPaul';
import { contactBlocks } from '@/components/blocks/contact';
import { presentationBlocks } from '@/components/blocks/Presentation';
import { servicesBlock } from '@/components/blocks/Services';
import { threeSceneBlock } from '@/components/blocks/ThreeScene';
import { projectsListBlockSchema } from '@/components/blocks/ProjectsList';

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
        accordionBlocks,
        bannerPaulBlocks,
        contactBlocks,
        presentationBlocks,
        servicesBlock,
        threeSceneBlock,
        projectsListBlockSchema,
      ],
    },
    {
      name: 'dev_note',
      label: 'Dev Note',
      type: 'string',
      ui: {
        component: () => null,
      },
    },
  ],
};

export default Page;
