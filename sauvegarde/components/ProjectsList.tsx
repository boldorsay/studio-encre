"use client";
import Link from "next/link";

export default function ProjectsList({ projects }) {
    if (!projects?.length) return null;

    return (
        <div className="projects-section">
            <h2 className="projects-title">Projets de Portfolio</h2>
            <div className="projects-list">
                {projects.map((project, index) => {
                    if (!project?.node) return null;
                    const filename = project.node._sys?.filename || project.node.id || `project-${index}`;

                    return (
                        <Link
                            href={`/blog/${filename}`}
                            key={index}
                            className="project-item"
                        >
                            <div className="project-item-content">
                                <span className="project-item-number">{(index + 1).toString().padStart(2, '0')}</span>
                                <span className="project-item-title">{project.node.title || 'Sans titre'}</span>
                                <span className="project-item-client">{project.node.client || 'Client non spécifié'}</span>
                                <span className="project-item-date">
                                    {project.node.date ? new Date(project.node.date).getFullYear() : ''}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
} 