import { notFound } from 'next/navigation';
import { client } from '@/tina/__generated__/client';
import { PortfolioSlider } from '@/components/blocks/ImageSlider';

export async function generateStaticParams() {
  const { data } = await client.queries.portfolioConnection();

  return (
    data.portfolioConnection.edges
      ?.filter((edge): edge is NonNullable<typeof edge> => !!edge?.node?._sys.filename)
      .map((edge) => ({
        slug: edge.node!._sys.filename,
      })) || []
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const { data } = await client.queries.portfolio({
    relativePath: `${slug}.mdx`,
  });

  const project = data.portfolio;
  if (!project) return notFound();

  const images = (project.images || [])
  .map((img) => img?.image)
  .filter((img): img is string => typeof img === 'string');

  return (
<PortfolioSlider
  images={images}
  title={project.title ?? ''}
  client={project.client ?? ''}
  description={project.body ?? ''}
  date={project.date ?? ''}
/>
  );
}