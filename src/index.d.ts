export type Page = {
  title: string;
  slug: string;
  style: string;
  sections: Section[];
};

export type Section = {
  id: string;
  order?: number;
  style?: string;
  style_mobile?: string;
  blocks: Block[];
};

export type Block = {
  id: string;
  type: "html" | "image" | "gallery";
  style?: string;

  // ? image / gallery
  src?: string;
  alt?: string;
  caption?: string;
  images: {
    src?: string;
    alt?: string;
    caption?: string;
  }[];
  // ? html
  content?: string;
};
