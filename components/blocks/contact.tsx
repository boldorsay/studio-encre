import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import '../css/contact.css';
import { Template } from "tinacms";

type ContactLink = {
  linkText?: string | null;
  linkUrl?: string | null;
};

type ContactData = {
  contactTitle?: string | null;
  contactDescription?: any | null;
  links?: (ContactLink | null)[] | null;
};

type ContactProps = {
  data: ContactData;
  tinaFieldBase?: string;
  id?: string;
};

export const Contact: React.FC<ContactProps> = ({ data, tinaFieldBase, id }) => {
  if (!data) return null;

  const { contactTitle, contactDescription, links } = data;

  // Helper pour href
  const getContactHref = (url: string | undefined | null): string => {
    if (!url) return '#';
    
    // Si l'URL commence déjà par tel: ou mailto:, la retourner telle quelle
    if (url.startsWith('tel:') || url.startsWith('mailto:')) {
      return url;
    }
    
    // Sinon, appliquer la logique de transformation
    if (url.includes('@')) return `mailto:${url}`;
    const cleanedUrl = url.replace(/[\s-()]/g, '');
    if (/^\+?\d+$/.test(cleanedUrl)) return `tel:${cleanedUrl}`;
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) return `https://${url}`;
    return url;
  };

  // Helper pour déterminer si on doit utiliser Link ou <a>
  const shouldUseLink = (url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/') || url === '#';
  };

  return (
    <section
      id={id}
      className="contact-section"
      data-tina-field={tinaFieldBase}
    >
      {contactTitle && (
        <h2 className="contact-title" data-tina-field={tinaFieldBase ? `${tinaFieldBase}.contactTitle` : undefined}>
          {contactTitle}
        </h2>
      )}

      {contactDescription && (
        <div className="contact-description" data-tina-field={tinaFieldBase ? `${tinaFieldBase}.contactDescription` : undefined}>
          <TinaMarkdown content={contactDescription} />
        </div>
      )}

      {links && Array.isArray(links) && (
        <div className="contact-links">
          {links
            .filter(link => link && (link.linkUrl || link.linkText))
            .map((link, index) => {
              if (!link) return null;
              const href = getContactHref(link.linkUrl);
              const text = link.linkText || link.linkUrl || 'Lien';
              const itemTinaField = tinaFieldBase ? `${tinaFieldBase}.links.${index}.linkUrl` : undefined;
              
              // Utiliser Link pour les URLs normales, <a> pour tel: et mailto:
              if (shouldUseLink(href)) {
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
              } else {
                return (
                  <a
                    key={index}
                    href={href}
                    className="contact-link"
                    data-tina-field={itemTinaField}
                  >
                    {text}
                  </a>
                );
              }
            })}
        </div>
      )}
    </section>
  );
};

export const contactBlocks: Template = {
    name: "contactLinks",
    label: "Section Contact",
    fields: [
      {
        name: "id",
        label: "ID de la section",
        type: "string",
        description: "ID utilisé pour les liens internes (ex: contact)"
      },
      {
        name: "contactTitle",
        label: "Titre de la section Contact",
        type: "string",
        description: "Le titre principal de la section contact (ex: Contact)"
      },
      {
        name: "contactDescription",
        label: "Description Contact",
        type: "rich-text",
        description: "Texte d'introduction sous le titre de la section contact."
      },
      {
        name: "links",
        label: "Liens de Contact",
        type: "object",
        list: true,
        ui: {
          itemProps: (item: any) => ({
            label: item?.linkText || "Nouveau lien",
          }),
        },
        fields: [
          {
            name: "linkText",
            label: "Texte du lien",
            type: "string",
          },
          {
            name: "linkUrl",
            label: "URL du lien",
            type: "string",
          },
        ],
      },
    ],
  };