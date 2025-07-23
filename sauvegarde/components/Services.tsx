"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import './css/services.css';

// Définir les types pour les props
interface Service {
    serviceTitle?: string | null;
    image?: string | null;
    description?: any | null; // Type 'any' pour le contenu rich-text
    __typename?: string;
}

interface ServicesProps {
    data?: (Service | null)[] | null;
    tinaFieldBase?: string; // Chemin de base pour tinaField
}

// Définir les textes pour chaque étape


export default function Services({ data, tinaFieldBase }: ServicesProps) {
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
    if (!data || !Array.isArray(data)) {
        return null;
    }

    return (
        <section ref={sectionRef} className="services-section-wrapper">
            <div className="services-grid">
                {data.map((service, index) => {
                    // S'assurer que service n'est pas null
                    if (!service) return null;

                    // Construire le chemin tinaField pour l'élément de la liste
                    const itemTinaField = `${tinaFieldBase}.${index}.serviceTitle`;

                    return (
                        <div
                            key={index}
                            className="service-card"
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                            style={{
                                willChange: 'transform',
                                transition: 'transform 0.1s ease-out'
                            }}
                            data-tina-field={itemTinaField}
                        >
                            {service.image && (
                                <div className="service-image">
                                    <Image
                                        src={service.image}
                                        alt={service.serviceTitle || 'Service'}
                                        width={800}
                                        height={500}
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                </div>
                            )}
                            <div className="service-content">
                                <h2>{service.serviceTitle}</h2>
                                <div className="service-description">
                                    {service.description && <TinaMarkdown content={service.description} />}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
} 