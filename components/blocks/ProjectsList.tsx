// components/blocks/ProjectsList.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';
import "../css/projects.css";
import { client } from '../../tina/__generated__/client';
import { Template } from 'tinacms';

export type ProjectItem = {
  title?: string;
  client?: string;
  date?: string;
  id?: string; // slug = _sys.filename
};



export const ProjectsList = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data } = await client.queries.portfolioConnection();
        const items =
          (data?.portfolioConnection?.edges ?? [])
            .flatMap(edge => {
              const node = edge?.node;
              if (!node) return [];
              return [{
                title: node.title ?? "",
                client: node.client ?? "",
                date: node.date ?? "",
                // on fabrique un vrai slug à partir du fichier
                id:
                  node?._sys?.filename ??
                  node?._sys?.relativePath?.replace(/\.(md|mdx)$/, '') ??
                  undefined,
              }];
            });
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
    <div className="projects-section">
    <h2 className="projects-title">Projets de Portfolio</h2>
      <div className="projects-list">
        {projects.map((project, index) => {
          if (!project.id) return null; // pas de slug → pas de lien
          return (
            <Link
              href={`/portfolio/${project.id}`}
              key={project.id}
              className="project-item"
            >
              <div className="project-item-content">
                <span className="project-item-number">{(index + 1).toString().padStart(2, '0')}</span>
                <span className="project-item-title">{project.title || 'Sans titre'}</span>
                <span className="project-item-client">{project.client || 'Client non spécifié'}</span>
                <span className="project-item-date">
                  {project.date ? (() => {
                    try {
                      const date = new Date(project.date);
                      return isNaN(date.getTime()) ? '' : date.getFullYear().toString();
                    } catch {
                      return '';
                    }
                  })() : ''}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

/** Bloc Tina minimal : visible dans l’admin, sans champ éditable */
export const projectsListBlockSchema: Template = {
  name: 'projectsList',
  label: 'Liste des Projets',
  ui: {
    itemProps: () => ({ label: 'Liste des Projets' }),
    defaultItem: {},
  },
  fields: [
    {
      type: 'boolean',
      name: 'placeholder',     // <- champ factice
      label: 'Placeholder',
      required: false,
      ui: { component: 'hidden' } // <- caché dans le Studio
    },
  ],
} as const;