import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Image from 'next/image';
import { Section } from '../layout/section';
import '../css/services.css';

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
  if (!data?.services?.length) return null;
  return (
    <Section background={data.background}>
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
    </Section>
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