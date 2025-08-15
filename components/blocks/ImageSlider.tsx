'use client';
import React, { useState, useEffect } from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { useRouter } from 'next/navigation';
import '../css/globals.css';
import '../css/image-slider.css';

export default function ImageSlider({ images, title, client, description, date }: PortfolioSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCredits, setShowCredits] = useState(false);
    const router = useRouter();

    // Store scroll position before navigation
    const handleBack = () => {
        if (typeof window !== 'undefined') {
            // Store current scroll position in sessionStorage
            sessionStorage.setItem('portfolioScrollPosition', window.scrollY.toString());
        }
        router.back();
    };

    // Restore scroll position on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedPosition = sessionStorage.getItem('portfolioScrollPosition');
            if (savedPosition) {
                window.scrollTo(0, parseInt(savedPosition));
                sessionStorage.removeItem('portfolioScrollPosition');
            }
        }
    }, []);

    const nextImage = () => {
        if (!showCredits) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
    };

    const previousImage = () => {
        if (!showCredits) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    const toggleCredits = () => {
        setShowCredits(!showCredits);
    };

    const isVideo = (url: string) => {
        if (!url) return false;
        return url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm');
    };

    return (
        <div className="image-slider">
            {/* Overlay des crédits */}
            {showCredits && (
                <div className="credits-overlay" onClick={toggleCredits}>
                    <div className="credits-content">
                        <div className="credits-title">
                            <span className="credits-label">PROJET</span>
                            <div>{title}</div>
                        </div>
                        <div className="credits-description">
                            <span className="credits-label">DESCRIPTION</span>
                            <div>
                              {typeof description === 'string'
                                ? description
                                : <TinaMarkdown content={description} />}
                            </div>
                        </div>
                        <div className="credits-client">
                            <span className="credits-label">CLIENT</span>
                            <div>{client}</div>
                        </div>
                        <div className="credits-date">
                            <span className="credits-label">DATE</span>
                            <div>
                                {date ? (() => {
                                    try {
                                        const dateObj = new Date(date);
                                        return isNaN(dateObj.getTime()) ? date : dateObj.getFullYear().toString();
                                    } catch {
                                        return date;
                                    }
                                })() : ''}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bouton Credits */}
            <div className="credits-button-container">
                <button className="credits-button" onClick={toggleCredits}>
                    [CRÉDITS]
                </button>
            </div>

            {/* Bouton Back */}
            <div className="back-button" onClick={handleBack}>RETOUR</div>

            {/* Zone de navigation gauche */}
            <div
                className="navigation-area navigation-area-left"
                onClick={previousImage}
            />

            {/* Contenu principal */}
            <div className={`slider-content ${showCredits ? 'blur' : ''}`}>
                {isVideo(images[currentIndex]) ? (
                    <video
                        src={images[currentIndex]}
                        className="slider-video"
                        autoPlay
                        loop
                        playsInline
                        muted
                    />
                ) : (
                    <img
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        className="slider-image"
                    />
                )}
            </div>

            {/* Zone de navigation droite */}
            <div
                className="navigation-area navigation-area-right"
                onClick={nextImage}
            />

            {/* Footer avec titre et navigation */}
            <div className="slider-footer">
                <div className="project-title">{title}</div>
                <div className="navigation-container">
                    <div className="pagination">[ {currentIndex + 1}/{images.length} ]</div>
                </div>
            </div>
        </div>
    );
}

export type PortfolioSliderProps = {
  images: string[];
  title: string;
  client: string;
  description: string;
  date: string;
};

export const PortfolioSlider = (props: PortfolioSliderProps) => <ImageSlider {...props} />; 