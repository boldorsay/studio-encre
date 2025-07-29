// app/portfolio/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { client } from '@/tina/__generated__/client';
import ImageSlider from '@/components/blocks/ImageSlider'; // ✅ import default

// ➜ Retourner la liste des slugs existants
export async function generateStaticParams() {
  const { data } = await client.queries.portfolioConnection();
  const slugs =
    (data?.portfolioConnection?.edges ?? [])
      .map(e => e?.node?._sys?.filename)
      .filter(Boolean) as string[];
  return slugs.map(slug => ({ slug }));
}

// ➜ Pas de Promise ici ; Next te passe directement { params: { slug } }
export default async function Page({ params }: { params: { slug: string } }) {
  const relativePath = `${params.slug}.mdx`;

  try {
    const { data } = await client.queries.portfolio({ relativePath });
    const project = data.portfolio;
    if (!project) return notFound();

    const images = (project.images || [])
      .map(img => img?.image)
      .filter((img): img is string => typeof img === 'string' && img.length > 0);

    return (
      <ImageSlider
        images={images}
        title={project.title ?? ''}
        client={project.client ?? ''}
        description={project.body ?? ''} // adapte si "body" est du rich-text
        date={project.date ?? ''}
      />
    );
  } catch {
    return notFound();
  }
}