import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";

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
    case "PageBlocksAccordion":
      return <Accordion data={block as any} />
    case "PageBlocksBanner" :
       return <BannerPaul data={block as any} />
       case "PageBlocksContactLinks":
  return <Contact data={block} />
  case "PageBlocksPresentation":
    return <Presentation data={block as any} tinaFieldBase={`page.blocks.${block.i}`} />
    case "PageBlocksProjectsList":
      return <ProjectsList  />;
    case "PageBlocksServices":
      return <ServicesBlock data={block as any} />;
    case "PageBlocksThreeScene":
      return <ThreeSceneBlock />;
    default:
      return null;
  }
};


