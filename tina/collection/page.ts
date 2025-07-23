import type { Collection } from 'tinacms';
import { heroBlockSchema } from '@/components/blocks/hero';
import { contentBlockSchema } from '@/components/blocks/content';
import { testimonialBlockSchema } from '@/components/blocks/testimonial';
import { featureBlockSchema } from '@/components/blocks/features';
import { videoBlockSchema } from '@/components/blocks/video';
import { calloutBlockSchema } from '@/components/blocks/callout';
import { statsBlockSchema } from '@/components/blocks/stats';
import { ctaBlockSchema } from '@/components/blocks/call-to-action';
import { accordionBlocks } from '@/components/blocks/accordion';
import { bannerPaulBlocks } from '@/components/blocks/BannerPaul';
import { contactBlocks } from '@/components/blocks/contact';
import { presentationBlocks } from '@/components/blocks/Presentation';
import { projectsListBlockSchema } from '@/components/blocks/ProjectsList';
import { servicesBlock } from '@/components/blocks/Services';
import { threeSceneBlock } from '@/components/blocks/ThreeScene';

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
        heroBlockSchema,
        calloutBlockSchema,
        featureBlockSchema,
        statsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
        accordionBlocks,
        bannerPaulBlocks,
        contactBlocks,
        presentationBlocks,
        projectsListBlockSchema,
        servicesBlock,
        threeSceneBlock
      ],
    },
  ],
};

export default Page;
