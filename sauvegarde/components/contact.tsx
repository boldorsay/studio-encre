"use client";

import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import './css/contact.css'; // Importer le CSS spécifique

// Helper function to determine the correct href prefix
const getContactHref = (url: string | undefined | null): string => {
    if (!url) return '#';
    if (url.includes('@')) return `mailto:${url}`;
    const cleanedUrl = url.replace(/[\s-()]/g, '');
    if (/^\+?\d+$/.test(cleanedUrl)) return `tel:${cleanedUrl}`;
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) return `https://${url}`;
    return url;
};

// Définir les types pour les props
interface ContactLink {
    linkText?: string | null;
    linkUrl?: string | null;
    __typename?: string;
}

interface ContactProps {
    data?: {
        contactTitle?: string | null;
        contactDescription?: any | null; // Type 'any' pour le contenu rich-text
        links?: (ContactLink | null)[] | null;
        __typename?: string;
    } | null;
    tinaFieldBase?: string; // Chemin de base pour tinaField
    id?: string;
}

export default function Contact({ data, tinaFieldBase, id }: ContactProps) {
    // Vérifier si les données existent
    if (!data) {
        return null;
    }

    const { contactTitle, contactDescription, links } = data;

    return (
        <section
            id={id}
            className="contact-section"
            data-tina-field={tinaFieldBase} // Champ Tina pour toute la section
        >
            {/* Titre de la section */}
            {contactTitle && (
                <h2
                    className="contact-title"
                    data-tina-field={`${tinaFieldBase}.contactTitle`} // Champ Tina pour le titre
                >
                    {contactTitle}
                </h2>
            )}

            {/* Description de la section */}
            {contactDescription && (
                <div
                    className="contact-description"
                    data-tina-field={`${tinaFieldBase}.contactDescription`} // Champ Tina pour la description
                >
                    <TinaMarkdown content={contactDescription} />
                </div>
            )}

            {/* Liens de contact */}
            {links && Array.isArray(links) && (
                <div className="contact-links">
                    {links
                        .filter(link => link && (link.linkUrl || link.linkText))
                        .map((link, index) => {
                            // S'assurer que link n'est pas null (déjà filtré mais bon pour TS)
                            if (!link) return null;

                            const href = getContactHref(link.linkUrl);
                            const text = link.linkText || link.linkUrl || 'Lien';

                            // Construire le chemin tinaField pour l'élément de la liste
                            const itemTinaField = `${tinaFieldBase}.links.${index}.linkUrl`;

                            return (
                                <Link
                                    key={index}
                                    href={href}
                                    className="contact-link"
                                    data-tina-field={itemTinaField}
                                >
                                    {text}
                                </Link>
                            );
                        })}
                </div>
            )}
        </section>
    );
}
