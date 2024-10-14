interface EditorContextProps {
  section?: Section;
  block?: Block;
  sections?: Section[];
  updateSection?: (section: Section) => void;
  updateBlock?: (block: Block) => void;
}

type Page = {
  id: string;
  title: string;
  slug: string;
  style: string;
  sections: Section[];
  created_at: string;
  updated_at: string;
  url: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

type Section = {
  id: string;
  order?: number;
  style?: string;
  style_mobile?: string;
  blocks: Block[];
};

type SectionEditor = {
  section: Section;
  selectedBlock: Block | null;
  updateBlock: (i: number, block: Block) => void;
};

type Block = {
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

export type { EditorContextProps, Page, Section, SectionEditor, Block };
