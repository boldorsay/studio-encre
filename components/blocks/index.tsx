import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { Content } from "./content";
import { Features } from "./features";
import { Testimonial } from "./testimonial";
import { Video } from "./video";
import { Callout } from "./callout";
import { Stats } from "./stats";
import { CallToAction } from "./call-to-action";
import { Accordion } from "./accordion";
import { BannerPaul } from "./BannerPaul";
import { Contact } from "./contact";
import { Presentation } from "./Presentation";
import { ProjectsList } from "./ProjectsList";
import { ServicesBlock } from "./Services";
import { ThreeSceneBlock } from "./ThreeScene";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
      <Block {...block} i={i} />
          </div>
        );
      })}
    </>
  );
};

const Block = (block: PageBlocks & { i?: number }) => {
  switch (block.__typename) {
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksCallout":
      return <Callout data={block} />;
    case "PageBlocksStats":
      return <Stats data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksCta":
      return <CallToAction data={block} />;
    case "PageBlocksAccordion":
      return <Accordion data={block} />
    case "PageBlocksBanner" :
       return <BannerPaul data={block} />
       case "PageBlocksContactLinks":
  return <Contact data={block} />
  case "PageBlocksPresentation":
    return <Presentation data={block} tinaFieldBase={`page.blocks.${block.i}`} />
    case "PageBlocksProjectsList":
      return <ProjectsList data={block} />;
    case "PageBlocksServices":
      return <ServicesBlock data={block} />;
    case "PageBlocksThreeScene":
      return <ThreeSceneBlock />;
    default:
      return null;
  }
};


