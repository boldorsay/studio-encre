import React from 'react';
import Image from 'next/image';
import './Banner.css';

// Données du bandeau - à modifier directement ici
const bannerData = [
    {
        title: "*Atelier Encré",
        subtitle: "Nyon, Suisse",
        link: "#"
    },
    {
        title: "Conservation-restauration",
        subtitle: "Documents graphiques",
        link: "#"
    },
    {
        title: "Contact",
        subtitle: "Nous contacter",
        link: "#contact"
    }
];

const Banner: React.FC = () => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        if (link.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(link);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="banner-container">
            {/* Élément décoratif à gauche */}

            {/* Contenu principal */}
            <div className="banner-center">
                {bannerData.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        className="banner-item"
                        onClick={(e) => handleClick(e, item.link)}
                    >
                        <div className="banner-title">
                            {item.title}
                        </div>
                        <div className="banner-subtitle">
                            {item.subtitle}
                        </div>
                    </a>
                ))}
            </div>

            {/* Bouton de défilement à droite */}
            <div className="banner-right">
                <button
                    type="button"
                    className="banner-button"
                >
                    <Image
                        src="/arrow.png"
                        alt="Défiler"
                        width={34}
                        height={105}
                    />
                </button>
            </div>
        </div>
    );
};

export default Banner; 