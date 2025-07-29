// app/portfolio/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { client } from '@/tina/__generated__/client';
import ImageSlider from '@/components/blocks/ImageSlider'; // <- export default

export async function generateStaticParams() {
  const { data } = await client.queries.portfolioConnection();
  const slugs =
    (data?.portfolioConnection?.edges ?? [])
      .map(e => e?.node?._sys?.filename)
      .filter(Boolean) as string[];
  return slugs.map(slug => ({ slug }));
}

// Typage simple et robuste : pas de Promise, et on lit slug en sécurité
export default async function Page(props: any) {
  const slug = props?.params?.slug as string | undefined;
  if (!slug) return notFound();

  try {
    const { data } = await client.queries.portfolio({
      relativePath: `${slug}.mdx`,
    });
    const project = data?.portfolio;
    if (!project) return notFound();

    const images = (project.images ?? [])
      .map(i => i?.image)
      .filter((s): s is string => !!s);

    return (
      <ImageSlider
        images={images}
        title={project.title ?? ''}
        client={project.client ?? ''}
        description={project.body ?? ''}
        date={project.date ?? ''}
      />
    );
  } catch {
    return notFound();
  }
}