import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Image from 'next/image';
import '../css/services.css';
import { useEffect, useRef } from 'react';

export type ServiceItem = {
  serviceTitle?: string;
  image?: string;
  description?: any;
};

export type ServicesBlockProps = {
  title?: string;
  services?: ServiceItem[];
  background?: string;
};

export const ServicesBlock = ({ data }: { data: ServicesBlockProps }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
      const handleScroll = () => {
          const imageElements = document.querySelectorAll<HTMLImageElement>('.service-image img');

          imageElements.forEach((imgElement) => {
              const container = imgElement.parentElement;
              if (!container) return;

              const rect = container.getBoundingClientRect();
              const windowHeight = window.innerHeight;

              // Ne calculer que si l'élément est dans le viewport ou proche
              if (rect.bottom > -100 && rect.top < windowHeight + 100) {
                  // Calculer la position relative de l'élément dans la fenêtre
                  const elementProgress = (windowHeight - rect.top) / (windowHeight + rect.height);

                  // Augmentation de l'effet de parallaxe à 15% de la hauteur de l'image
                  const maxMove = rect.height * 0.15;
                  const offset = maxMove * (elementProgress - 0.5) * 2;

                  // Appliquer la transformation avec une limite
                  const limitedOffset = Math.max(Math.min(offset, maxMove), -maxMove);
                  imgElement.style.transform = `translate3d(0, ${limitedOffset}px, 0)`;
              }
          });
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Position initiale

      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Vérifier si les données existent et sont un tableau
  if (!data || !Array.isArray(data.services)) {
    return null;
  }

  if (!data?.services?.length) return null;
  return (
    <div className="services-section-wrapper">
      <h2 className="services-title" data-tina-field={tinaField(data, 'title')}>{data.title || 'Nos Services'}</h2>
      <div className="services-grid">
        {data.services.map((service, index) => (
          <div className="service-card" key={index} data-tina-field={tinaField(service, 'serviceTitle')}>
            {service.image && (
              <div className="service-image">
                <Image
                  src={service.image}
                  alt={service.serviceTitle || 'Service'}
                  width={800}
                  height={500}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
            )}
            <div className="service-content">
              <h3>{service.serviceTitle}</h3>
              <div className="service-description">
                {service.description && <TinaMarkdown content={service.description} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export const servicesBlock: Template = {
    name: 'services',
    label: 'Services',
    fields: [
      {
        name: 'title',
        label: 'Titre',
        type: 'string',
      },
      {
        name: 'services',
        label: 'Liste de services',
        type: 'object',
        list: true,
        fields: [
          {
            name: 'serviceTitle',
            label: 'Titre du service',
            type: 'string',
          },
          {
            name: 'image',
            label: 'Image',
            type: 'image',
          },
          {
            name: 'description',
            label: 'Description',
            type: 'rich-text',
          },
        ],
      },
    ],
  };