import React from 'react';
import Image from 'next/image';
import '../css/Banner.css';
import { Template } from 'tinacms';




type BannerItem = {
    title: string;
    subtitle: string;
    link: string;
}

type BannerProps = {
    data: {
        items: BannerItem[];
    }
}

export const BannerPaul: React.FC<BannerProps> = ({ data }) => {

    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        if (link.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(link);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const items = data.items?.filter(Boolean) || [];


    return (
        <div className="banner-container">
            {/* Élément décoratif à gauche */}

            {/* Contenu principal */}
            <div className="banner-center">
            {items.map((item, index) => {
                // Toujours utiliser des liens, mais avec des href appropriés
                return (
                    <a
                        key={item.title || index}
                        href={item.link || "#"}
                        className="banner-item"
                        onClick={(e) => {
                            // Empêcher la navigation si pas de lien valide
                            if (!item.link || item.link === "#" || item.link === "") {
                                e.preventDefault();
                                return;
                            }
                            handleClick(e, item.link);
                        }}
                        style={{ 
                            cursor: (!item.link || item.link === "#" || item.link === "") ? 'default' : 'pointer' 
                        }}
                    >
                        <div className="banner-title">
                            {item.title}
                        </div>
                        <div className="banner-subtitle">
                            {item.subtitle}
                        </div>
                    </a>
                );
            })}
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

export const bannerPaulBlocks: Template = {
    name: "banner",
    label: "Bandeau",
    fields: [
      {
        name: "items",
        label: "Items",
        type: "object",
        list: true,
        fields: [
          { name: "title", label: "Titre", type: "string" },
          { name: "subtitle", label: "Sous-titre", type: "string" },
          { name: "link", label: "Lien", type: "string" },
        ],
      },
    ],
  };