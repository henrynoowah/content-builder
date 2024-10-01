import { Block } from "@src/types";
import useEmblaCarousel from "embla-carousel-react";

const Carousel = ({ images }: Block) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  return (
    <div
      className="nwcb-w-full nwcb-h-full"
      ref={emblaRef}
      style={{ overflow: "hidden" }}
    >
      <div
        className="embla__container"
        style={{
          width: "100%:",
          height: "100%",
          display: "flex",
        }}
      >
        {images.map((image, i) => (
          <div
            key={`id-${image.src}-${i}`}
            className="embla__slide nwcb-flex nwcb-w-full nwcb-h-full"
            style={{
              flex: "0 0 100%",
              minWidth: 0,
            }}
          >
            <img
              key={`section-block-container-${image.src}`}
              src={image.src}
              alt={image.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
