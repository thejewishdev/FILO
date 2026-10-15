import Image, { type ImageProps } from "next/image";
import { photoSrc, photos, type PhotoKey } from "@/data/photos";

type PhotoProps = Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & { photo: PhotoKey };

/** next/image with the photo's blur placeholder. Use `fill` + `sizes`, or width/height. */
export function Photo({ photo, quality = 70, style, ...props }: PhotoProps) {
  const entry: { blur: string; focus?: string } = photos[photo];
  return (
    <Image
      src={photoSrc(photo)}
      placeholder="blur"
      blurDataURL={entry.blur}
      quality={quality}
      style={entry.focus ? { objectPosition: entry.focus, ...style } : style}
      {...props}
    />
  );
}
