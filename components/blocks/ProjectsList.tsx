import { useEffect, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import Link from 'next/link';
import { Section } from '../layout/section';
import "../css/projects.css";
// @ts-ignore
import { client } from '../../tina/__generated__/client';

export type ProjectItem = {
  title?: string;
  client?: string;
  date?: string;
  id?: string;
};

export const ProjectsList = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data } = await client.queries.portfolioConnection();
        const items = data.portfolioConnection.edges.map(({ node }) => ({
          title: node.title,
          client: node.client,
          date: node.date,
          id: node._sys.filename,
        }));
        setProjects(items);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) return <div>Chargement des projets…</div>;
  if (!projects.length) return <div>Aucun projet à afficher.</div>;

  return (
    <Section>
      <div className="projects-section">
        <h2 className="projects-title">Projets de Portfolio</h2>
        <div className="projects-list">
          {projects.map((project, index) => {
            const filename = project.id || `project-${index}`;
            return (
              <Link
                href={`/portfolio/${filename}`}
                key={index}
                className="project-item"
              >
                <div className="project-item-content">
                  <span className="project-item-number">{(index + 1).toString().padStart(2, '0')}</span>
                  <span className="project-item-title">{project.title || 'Sans titre'}</span>
                  <span className="project-item-client">{project.client || 'Client non spécifié'}</span>
                  <span className="project-item-date">{project.date ? new Date(project.date).getFullYear() : ''}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export const projectsListBlockSchema = {
  name: 'projectsList',
  label: 'Liste de Projets',
  ui: {
    previewSrc: '/blocks/features.png',
    defaultItem: {
      title: 'Projets de Portfolio',
      description: 'Découvrez nos réalisations',
      projects: [
        { title: 'Projet 1', client: 'Client A', date: '2023-01-01', id: 'projet-1' },
        { title: 'Projet 2', client: 'Client B', date: '2022-06-15', id: 'projet-2' },
      ],
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Titre',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
      ui: { component: 'textarea' },
    },
    {
      type: 'object',
      label: 'Projets',
      name: 'projects',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title }),
        defaultItem: {
          title: 'Projet',
          client: 'Client',
          date: '2023-01-01',
          id: 'projet',
        },
      },
      fields: [
        { type: 'string', label: 'Titre', name: 'title' },
        { type: 'string', label: 'Client', name: 'client' },
        { type: 'datetime', label: 'Date', name: 'date' },
        { type: 'string', label: 'ID (slug)', name: 'id' },
      ],
    },
    {
      type: 'string',
      label: 'Background',
      name: 'background',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Tint', value: 'tint' },
        { label: 'Primary', value: 'primary' },
      ],
    },
  ],
}; 