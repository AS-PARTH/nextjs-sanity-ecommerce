"use client";
import Image from "next/image";
import { urlForImage } from "../sanity/lib/image";
import { useState } from "react";

interface iAppPage {
  images: any;
}
export default function ImageGallery({ images }: iAppPage) {
  const [bigImage, setBigImage] = useState(images[0]);
  const handleSmallImages = (image: any) => {
    setBigImage(image);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, idx: any) => (
          <div key={idx} className="overflow-hidden rounded-lg ">
            <Image
              src={urlForImage(image)}
              width={200}
              height={200}
              alt="photo"
              className="h-full w-full object-cover object-center cursor-pointer"
              onClick={() => handleSmallImages(image)}
              layout="responsive"
            />
          </div>
        ))}
      </div>

      <div className=" relative overflow-hidden rounded-lg  lg:col-span-4">
        <Image
          src={urlForImage(bigImage)}
          width={500}
          height={500}
          alt="photo"
          className="h-full w-full object-center"
          layout="responsive"
        />
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}
