import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

interface PresentationProps {
    presentation: {
        image?: string;
        title?: string;
        content: any;
        imagePosition?: 'right' | 'left';
    };
    tinaData: any;
}

export default function Presentation({ presentation, tinaData }: PresentationProps) {
    if (!presentation) return null;

    return (
        <section
            className="presentation-section"
            data-tina-field={tinaField(tinaData.page, "presentation")}
        >
            <div className={`presentation-container ${presentation.imagePosition === 'right' ? 'image-right' : ''}`}>
                <div
                    className="presentation-image"
                    style={presentation.image ? {
                        backgroundImage: `url(${presentation.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    } : undefined}
                >
                    {/* L'image est maintenant en arrière-plan */}
                </div>
                <div className="presentation-content">
                    <div
                        className="presentation-text"
                        data-tina-field={tinaField(tinaData.page.presentation, "content")}
                    >
                        <TinaMarkdown content={presentation.content} />
                    </div>
                </div>
            </div>
        </section>
    );
}