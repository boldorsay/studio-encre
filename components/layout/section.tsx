import React, { ReactNode } from 'react';



interface SectionProps {
  children: ReactNode;
  /** classe Tailwind pour le fond, ex: "bg-white/80" */
  background?: string;
  /** classes supplémentaires si besoin */
  className?: string;
  /** styles inline éventuellement */
  style?: CSSProperties;
}

/**
 * Rendu d'une vraie balise <section> avec la classe de background.
 * On fusionne background + className proprement.
 */
export const Section: React.FC<SectionProps> = ({
  children,
  background,
  className,
  style,
  ...rest
}) => {
  const classes = [background, className].filter(Boolean).join(' ');
  return (
    <section className={classes} style={style} {...rest}>
      {children}
    </section>
  );
};

export const tailwindBackgroundOptions = [
  { label: "Default", value: "bg-default" },
  { label: "White", value: "bg-white/80" },
  { label: "Gray", value: "bg-gray-50/80" },
  { label: "Zinc", value: "bg-zinc-50" },
  { label: "Black", value: "bg-black/80" },
  { label: "Red", value: "bg-red-50/80" },
  { label: "Orange", value: "bg-orange-50/80" },
  { label: "Yellow", value: "bg-yellow-50/80" },
  { label: "Green", value: "bg-green-50/80" },
  { label: "Lime", value: "bg-lime-50/80" },
  { label: "Emerald", value: "bg-emerald-50/80" },
  { label: "Teal", value: "bg-teal-50/80" },
  { label: "Cyan", value: "bg-cyan-50/80" },
  { label: "Blue", value: "bg-blue-50/80" },
  { label: "Sky", value: "bg-sky-50/80" },
  { label: "Indigo", value: "bg-indigo-50/80" },
  { label: "Violet", value: "bg-violet-50/80" },
  { label: "Purple", value: "bg-purple-50/80" },
  { label: "Fuchsia", value: "bg-fuchsia-50/80" },
  { label: "Pink", value: "bg-pink-50/80" },
  { label: "Rose", value: "bg-rose-50/80" },
];

export const sectionBlockSchemaField = {
  type: "string",
  label: "Background",
  name: "background",
  options: tailwindBackgroundOptions,
};