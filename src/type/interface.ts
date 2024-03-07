export interface simplifiedProduct {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
}
export interface DescriptionBlock {
  _type: string;
  style: string;
  _key: string;
  markDefs: string[];
  children: {
    _type: string;
    marks: string[];
    text: string;
    _key: string;
  }[];
}

export interface fullProduct {
  _id: string;
  images: string[];
  price: number;
  name: string;
  description: DescriptionBlock[];
  slug: string;
  categoryName: string;
}
