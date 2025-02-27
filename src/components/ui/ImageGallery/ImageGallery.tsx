import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./Thumb";
import { ZoomableImg } from "../ZoomableImg";
import { ZoomedImageGallery } from "./ZoomedImageGallery";
import { useWindowSize } from "@/hooks/useWindowSize";

export type ImageGalleryProps = {
  images: {
    src: string;
    alt: string;
  }[];
  caption?: string;
};

export const ImageGallery = ({ images, caption }: ImageGalleryProps) => {
  const windowSize = useWindowSize();
  const [isZoom, setIsZoom] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
    axis: "x",
  });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla || !emblaThumbs) return;
    emblaThumbs.scrollTo(selectedIndex);
    embla.scrollTo(selectedIndex);
  }, [selectedIndex, embla, emblaThumbs]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  // When we first enter the page, the image is still loading but the gallery is
  // ready. This will cause the embla wrongly calculating the position. So we need
  // to re-initialize it again.

  useEffect(() => {
    if (embla) {
      embla.reInit();
    }

    if (emblaThumbs) {
      emblaThumbs.reInit();
    }
  }, [images, embla, emblaThumbs]);

  return (
    <>
      <style jsx>
        {`
          .embla {
            margin: auto;
          }

          .embla__viewport {
            overflow: hidden;
            width: 100%;
          }

          .embla__viewport.is-draggable {
            cursor: move;
            cursor: grab;
          }

          .embla__viewport.is-dragging {
            cursor: grabbing;
          }

          .embla__container {
            display: flex;
            flex-direction: row;
            user-select: none;
            -webkit-touch-callout: none;
            -khtml-user-select: none;
            -webkit-tap-highlight-color: transparent;
            margin-left: -10px;
          }

          .embla--thumb {
            padding-top: 20px;
          }

          .embla__slide {
            padding-left: 10px;
            min-width: 100%;
            position: relative;
          }

          .embla__slide__inner {
            display: flex;
            height: 240px;
          }

          .embla__slide__img {
            margin: 0 auto;
            object-fit: contain;
            height: 100%;
          }

          @media screen and (min-width: 480px) {
            .embla__slide__inner {
              height: 400px !important;
            }
          }

          @media screen and (min-width: 768px) {
            .embla__slide__inner {
              height: 400px !important;
            }
          }

          @media screen and (min-width: 1127px) {
            .embla__slide__inner {
              height: 550px !important;
            }
          }
        `}
      </style>
      <div className="embla">
        <div className="embla__viewport" ref={mainViewportRef}>
          <div className="embla__container">
            {images.map((image) => (
              <div className="embla__slide" key={image.src}>
                <div className="embla__slide__inner">
                  <ZoomableImg
                    src={image.src}
                    alt={image.alt}
                    zoomWithButton={true}
                    disable={
                      windowSize
                        ? windowSize.width > 768
                          ? false
                          : true
                        : true
                    }
                    isZoom={isZoom}
                    setIsZoom={setIsZoom}
                    customZoomElement={
                      <ZoomedImageGallery
                        images={images}
                        isZoom={isZoom}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                      />
                    }
                    disableCaption={true}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 mb-0 font-sans text-sm text-instillGrey70 md:hidden">
            Swipe to see other images.
          </p>
        </div>
      </div>

      <div className="embla embla--thumb hidden xl:block">
        <div className="embla__viewport mb-5" ref={thumbViewportRef}>
          <div className="embla__container embla__container--thumb">
            {images.map((image, i) => (
              <Thumb
                onClick={() => onThumbClick(i)}
                selected={i === selectedIndex}
                imgSrc={image.src}
                key={image.src}
              />
            ))}
          </div>
        </div>
        <div className="text-center font-sans text-sm font-normal text-instillGrey70 dark:text-instillGrey50">
          {caption}
        </div>
      </div>
    </>
  );
};
