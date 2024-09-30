import useEmblaCarousel from "embla-carousel-react";
import { Block } from "../types";

const Carousel = ({ images }: Block) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  return (
    <div
      className="embla w-full h-full"
      ref={emblaRef}
      style={{ overflow: "hidden" }}
    >
      <div
        className="embla__container w-full h-full"
        style={{ display: "flex" }}
      >
        {images.map((image, i) => (
          <div
            key={`id-${image.src}-${i}`}
            className="embla__slide flex w-full h-full"
            style={{
              flex: "0 0 100%",
              minWidth: 0,
              backgroundColor: "gray",
            }}
          >
            <img
              key={`section-block-container-${image.src}`}
              src={image.src}
              alt={image.alt}
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
