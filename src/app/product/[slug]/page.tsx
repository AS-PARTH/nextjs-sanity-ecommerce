import ImageGallery from "@/src/components/ImageGallery";
import { Button } from "@/src/components/ui/button";
import { client } from "@/src/sanity/lib/client";
import { DescriptionBlock, fullProduct } from "@/src/type/interface";
import { Star, Truck } from "lucide-react";

async function getData(slug: string): Promise<fullProduct> {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
        _id,
          images,
          price, 
          name, 
          description, 
          "slug":slug.current,
          "categoryName":category->name,
      }`;
  const data: fullProduct = await client.fetch(query);
  return data;
}
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>
            <div className="mb-6 flex items-center gap-3 md:mb-3">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.3</span>
                <Star className="h-6 w-5" />
              </Button>

              <span className="text-sm text-gray-500 transition duration-100 ">
                56 Ratings
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${data.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${data.price + 30}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Incl. Vat plus shipping
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-500 ">
              <Truck className="w-6 h-6" />
              <span className="text-sm ">2-4 Day shipping</span>
            </div>

            <div className="flex gap-2.5">
              <Button>Add to Bag</Button>
              <Button variant={"secondary"}>CheckOut Now</Button>
            </div>

            <div className="mt-12 text-base text-gray-500 tracking-wide">
              {data.description.map(
                (block: DescriptionBlock, index: number) => (
                  <p key={index} className="mb-4">
                    {block.children.map((child, childIndex) => (
                      <span
                        key={childIndex}
                        className={
                          child._type === "span" && child.marks.includes("em")
                            ? "italic"
                            : ""
                        }
                      >
                        {child.text}
                      </span>
                    ))}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
