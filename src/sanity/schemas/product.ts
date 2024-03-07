export default {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name of the Product",
    },
    {
      name: "slug",
      type: "slug",
      title: "Product Slug",
      options: {
        source: "name",
      },
    },
    {
      name: "images",
      type: "array",
      title: "Product of Images",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "description",
      title: "Description of product",
      type: "blockContent",
    },
    {
      name: "price",
      type: "number",
      title: "Price",
    },
    {
      name: "category",
      title: "Product of Category",
      type: "reference",
      to: [
        {
          type: "category",
        },
      ],
    },
  ],
};
