import React, {
  ReactNode,
  useCallback,
  useEffect,
  useState,
  useMemo,
  memo,
} from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

type PropTypeUmblaCarousel = {
  slides: any[];
  options?: EmblaOptionsType;
  PreviewChild: (item: any) => ReactNode;
  ThumChild: ({
    item,
    onClick,
  }: {
    item: any;
    onClick: () => void;
  }) => ReactNode;
  onScroll: (index: number) => void;
};

const EmblaCarousel: React.FC<PropTypeUmblaCarousel> = (props) => {
  const { slides = [], options, PreviewChild, ThumChild, onScroll } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );
  
  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);
  
  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  useEffect(() => {
    onScroll(selectedIndex);
  }, [selectedIndex]);

  const SlideMemo = useMemo(() => {
    return (
      <>
        <div className="overflow-hidden" ref={emblaMainRef}>
          <div className="flex touch-pan-y touch-pinch-zoom -ml-4">
            {Array.isArray(slides) &&
                slides.map((item, index: number) => (
                  <div
                    className="transform-gpu flex-none w-full min-w-0 pl-4"
                    key={index}
                  >
                    <div className="flex items-center justify-center h-80 select-none">
                      <PreviewChild item={item} />
                    </div>
                  </div>
                ))
              }
          </div>
        </div>
        <div className="mt-3">
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div
            className={`flex justify-center ${
              Array.isArray(slides) && slides.length > 6 && "ml-[75px]"
            } gap-2`}
          >
            {Array.isArray(slides) &&
              slides.map((item, index: number) => (
                <React.Fragment key={index}>
                  <ThumChild item={item} onClick={() => onThumbClick(index)} />
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
      </>
    )
  }, [slides, emblaMainApi, emblaThumbsApi])

  return (
    <div className="max-w-[34rem] m-auto">
      {SlideMemo}
    </div>
  );
};

export default EmblaCarousel;
