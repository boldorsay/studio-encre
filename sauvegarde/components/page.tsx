"use client";
import { PageQuery } from "../tina/__generated__/types";
import Image from "next/image";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Link from "next/link";
import dynamic from "next/dynamic";
import '../app/globals.css';
import './css/presentation.css';
import './css/accordion.css';
import './css/projects.css';
import Accordion from './accordion';
import Banner from './Banner';
import Presentation from './Presentation';
import Contact from './contact';
import Services from './Services';
import ProjectsList from './ProjectsList';

// Importez Three.js dynamiquement (côté client uniquement)
const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

export default function Page({ data, projectsData, query, variables }) {
  const { data: tinaData } = useTina({
    query,
    variables,
    data,
  });

  // Extraction des projets de portfolio
  const projects = projectsData?.postConnection?.edges || [];



  if (!tinaData?.page) {
    return <div>Loading...</div>;
  }

  // Si pas de projets, afficher un message
  if (!projects?.length) {
    return <div>Aucun projet à afficher</div>;
  }

  return (
    <div className="content">
      {/* Canvas Three.js en haut */}
      <div style={{ position: 'relative' }}>
        {/* <ThreeScene /> */}

        {/* Utilisation du composant Banner simplifié */}
        <Banner />
      </div>



      {/* Section Accordéon */}
      {tinaData.page?.accordion && (
        <Accordion
          sectionTitle={tinaData.page.accordion.title}
          sectionIntro={tinaData.page.accordion.introText}
          items={tinaData.page.accordion.items}
          tinaData={tinaData}
        />
      )}
      {/* Section Services */}
      <Services
        data={tinaData.page?.services}
        tinaFieldBase={tinaField(tinaData.page, "services")}
      />

      {/* Projets de Portfolio */}

      <ProjectsList projects={projects} />


      {/* Section Présentation */}
      {tinaData.page.presentation && (
        <Presentation
          presentation={tinaData.page.presentation}
          tinaData={tinaData}
        />
      )}




      {/* Section Contact */}
      <Contact
        id="contact"
        data={tinaData.page?.contactLinks}
        tinaFieldBase={tinaField(tinaData.page, "contactLinks")}
      />
    </div>
  );
} 