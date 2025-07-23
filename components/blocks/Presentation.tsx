import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Template } from "tinacms";
import "../css/presentation.css";

type PresentationData = {
    image_link?: string | null;
    title?: string | null;
    content?: any;
    imagePosition?: 'right' | 'left' | null;
};

type PresentationProps = {
    data: PresentationData;
    tinaFieldBase?: string;
    id?: string;
};

export const Presentation: React.FC<PresentationProps> = ({ data, tinaFieldBase, id }) => {
    if (!data) return null;

    const { image_link, title, content, imagePosition } = data;

    return (
        <section
            id={id}
            className="presentation-section"
            data-tina-field={tinaFieldBase}
        >
            <div className={`presentation-container ${imagePosition === 'right' ? 'image-right' : ''}`}>
                {image_link && (
                    <div
                        className="presentation-image"
                        style={{
                            backgroundImage: `url(${image_link})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                )}
                <div className="presentation-content">
                    {title && (
                        <h2
                            className="presentation-title"
                            data-tina-field={tinaFieldBase ? `${tinaFieldBase}.title` : undefined}
                        >
                            {title}
                        </h2>
                    )}
                    {content && (
                        <div
                            className="presentation-text"
                            data-tina-field={tinaFieldBase ? `${tinaFieldBase}.content` : undefined}
                        >
                            <TinaMarkdown content={content} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export const presentationBlocks: Template = {
        name: "presentation",
        label: "Présentation",
        fields: [
          {
            name: "image_link",
            label: "Image",
            type: "string",
            ui: { component: "image" }
          },
          {
            name: "title",
            label: "Titre",
            type: "string"
          },
          {
            name: "content",
            label: "Contenu",
            type: "rich-text"
          },
          {
            name: "imagePosition",
            label: "Position de l'image",
            type: "string",
            options: [
              { value: "left", label: "Gauche" },
              { value: "right", label: "Droite" }
            ]
          }
        ]
      }


