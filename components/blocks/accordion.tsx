"use client";
import { useState, useEffect, useRef } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";
import type { Template } from 'tinacms';
import "../css/accordion.css";
import Image from "next/image";
import Ruler from './Ruler';

interface AccordionItemProps {
    title: string;
    content: any;
    image?: string;
    isOpen: boolean;
    onClick: () => void;
    itemField: any;
    imageField: any;
    contentField: any;
}

function AccordionItem({ title, content, image, isOpen, onClick, itemField, imageField, contentField }: AccordionItemProps) {
    return (
        <div className={`accordion-item ${isOpen ? 'active' : ''}`}>
            <div
                className="accordion-header"
                onClick={onClick}
                data-tina-field={itemField}
            >
                <h3>{title || "Sans titre"}</h3>
                <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
            </div>
            <div
                className={`accordion-content ${isOpen ? 'open' : ''}`}
                data-tina-field={contentField}
            >
                <TinaMarkdown content={content || ""} />
                <div className="accordion-content-inner">
                    {image && (
                        <div className="accordion-item-image" data-tina-field={imageField}>
                            <Image src={image} alt={title || 'Image'} width={600} height={300} style={{ width: '100%', height: 'auto', marginTop: '1rem' }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Nouvelle interface qui correspond au pattern des autres blocs
type AccordionProps = {
    data: AccordionItemProps[]; // 
}

export const Accordion = ({ data }: AccordionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const svgRef = useRef<SVGSVGElement>(null);

    // Extraire les données du bloc
    const sectionTitle = data.title;
    const sectionIntro = data.introText;
    const items = data.items || [];

    useEffect(() => {
        if (svgRef.current) {
            const movingElement = svgRef.current.querySelector('path.st0');
            if (movingElement) {
                movingElement.setAttribute('fill', 'red');
            }
        }
    }, []);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);

        // Animation du rouleur
        const movingElement = document.querySelector('#Layer_21 path.st0');
        if (movingElement) {
            const positions = [-100, -20, 50]; // Positions pour les 3 accordéons
            const position = positions[index] || 0;
            (movingElement as SVGElement).style.transform = `translateY(${position}px)`;
        }
    };

    if (!items || items.length === 0) {
        return null;
    }

    // Filtrer les éléments nuls ou invalides
    const validItems = items.filter(item => item);

    // Si aucun élément valide n'est trouvé, ne rien afficher
    if (validItems.length === 0) {
        return null;
    }

    return (
        <section className="accordion-section">
            <div className="accordion-layout">
                <div className="accordion-header-section">
                    <h2 className="accordion-title" data-tina-field={tinaField(data, "title")}>
                        {sectionTitle || "Services"}
                    </h2>
                    <div className="accordion-description" data-tina-field={tinaField(data, "introText")}>
                        <TinaMarkdown content={sectionIntro || ""} />
                    </div>
                </div>

                <div className="accordion-divider">
                    <Ruler
                        ref={svgRef}
                        height={800}
                        style={{
                            '--transition-duration': '0.8s',
                            '--transition-timing': 'cubic-bezier(0.4, 0, 0.2, 1)'
                        } as React.CSSProperties}
                    />
                </div>

                <div className="accordion-container">
                    {validItems.map((item, index) => (
                        <AccordionItem
                            key={index}
                            title={item.title || "Sans titre"}
                            content={item.content || ""}
                            image={item.image}
                            isOpen={openIndex === index}
                            onClick={() => toggleAccordion(index)}
                            itemField={tinaField(data.items[index], "title")}
                            imageField={tinaField(data.items[index], "image")}
                            contentField={tinaField(data.items[index], "content")}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export const accordionBlocks: Template = {
    name: "accordion",
    label: "Accordéon",
    type: "object",
    fields: [
        {
            name: "title",
            label: "Titre de la section",
            type: "string",
        },
        {
            name: "introText",
            label: "Texte intro",
            type: "rich-text"
        },
        {
            name: "items",
            label: "Items",
            type: "object",
            list: true,
            ui: {
                itemProps: (item: any) => ({
                    label: item?.title || "Nouvel élément",
                }),
            },
            fields: [
                {
                    name: "title",
                    label: "Titre",
                    type: "string",
                    required: false,
                },
                {
                    name: "image",
                    label: "Image",
                    type: "image",
                },
                {
                    name: "content",
                    label: "Contenu",
                    type: "rich-text",
                }
            ]
        }
    ]
}

