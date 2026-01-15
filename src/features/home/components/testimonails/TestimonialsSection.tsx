import React, {
  useCallback,
  useMemo,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  useKeenSlider,
  KeenSliderInstance,
  KeenSliderOptions,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import SectionHeader from "@/common/components/section-header/SectionHeader";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetAllReviews from "../../api/reveiws/useGetAllReviews";
import { useLanguage } from "@/store/LanguageProvider";
import TestimonialCard from "./TestimonialCard";
import { Link } from "react-router-dom";
import MainBtn from "@/common/components/buttons/MainBtn";

/* -------------------------------------------------------------------------- */
/*                                   Config                                   */
/* -------------------------------------------------------------------------- */

const SLIDE_SPACING = 16;
const AUTOPLAY_DELAY = 4000;

const BREAKPOINTS: KeenSliderOptions["breakpoints"] = {
  "(min-width: 1280px)": { slides: { perView: 4, spacing: SLIDE_SPACING } },
  "(max-width: 1279px)": { slides: { perView: 3, spacing: SLIDE_SPACING } },
  "(max-width: 1024px)": { slides: { perView: 2, spacing: SLIDE_SPACING } },
  "(max-width: 640px)": { slides: { perView: 1, spacing: 12 } },
};

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* -------------------------------------------------------------------------- */
/*                               Helper Hooks                                 */
/* -------------------------------------------------------------------------- */

function usePageVisibility() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handler = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  return visible;
}

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

const TestimonialsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === "ar" || i18n.dir() === "rtl";

  const shouldReduceMotion = useReducedMotion();
  const pageVisible = usePageVisibility();

  const sectionId = useId();
  const autoplayRef = useRef<number | null>(null);

  const query = useGetAllReviews();
  const reviews = useMemo(() => query.data ?? [], [query.data]);
  const total = reviews.length;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  /* --------------------------- Autoplay helpers --------------------------- */

  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(
    (slider?: KeenSliderInstance | null) => {
      if (!slider || !loaded || !pageVisible || shouldReduceMotion) return;

      clearAutoplay();
      autoplayRef.current = window.setInterval(
        () => slider.next(),
        AUTOPLAY_DELAY
      );
    },
    [clearAutoplay, loaded, pageVisible, shouldReduceMotion]
  );

  /* --------------------------- Keen Config --------------------------- */

  const sliderOptions = useMemo<KeenSliderOptions>(
    () => ({
      rtl: isRTL,
      loop: true,
      mode: "snap",
      renderMode: "performance",
      slides: {
        perView: 4,
        spacing: SLIDE_SPACING,
      },
      breakpoints: BREAKPOINTS,
      created(slider) {
        setLoaded(true);
        setCurrentSlide(slider.track.details.rel);
        startAutoplay(slider);
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    }),
    [isRTL, startAutoplay]
  );

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(sliderOptions);

  /* --------------------------- Navigation --------------------------- */

  const prev = () => instanceRef.current?.prev();
  const next = () => instanceRef.current?.next();

  /* -------------------------------------------------------------------------- */

  return (
    <FetchHandler queryResult={query} skeletonType="slider">
      {total > 0 && (
        <LazyMotion features={domAnimation}>
          <m.section
            className="section-shell"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            aria-labelledby="testimonials-heading"
          >
            <div className="containerr space-y-6">
              <SectionHeader
                title="Testimonials"
                titleId="testimonials-heading"
                description="Reassurance from patients and clinicians"
                hasViewAll={false}
              />
              <p className="sr-only" aria-live="polite">
                Slide {currentSlide + 1} of {total}
              </p>

              {/* Controls */}
              <div className="hidden sm:flex gap-2 justify-end">
                <button
                  aria-label={t("Previous")}
                  onClick={prev}
                  className="control-btn"
                  aria-controls={`${sectionId}-slider`}
                >
                  {isRTL ? <ChevronRight /> : <ChevronLeft />}
                </button>
                <button
                  aria-label={t("Next")}
                  onClick={next}
                  className="control-btn"
                  aria-controls={`${sectionId}-slider`}
                >
                  {isRTL ? <ChevronLeft /> : <ChevronRight />}
                </button>
              </div>

              {/* Slider */}
              <div
                id={`${sectionId}-slider`}
                ref={sliderRef}
                dir={isRTL ? "rtl" : "ltr"}
                className="keen-slider items-stretch"
                onMouseEnter={clearAutoplay}
                onMouseLeave={() => startAutoplay(instanceRef.current)}
              >
                {reviews.map((item, i) => (
                  <div
                    key={item.id ?? i}
                    className="keen-slider__slide flex h-auto"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Slide ${currentSlide + 1} of ${total}`}
                  >
                    <TestimonialCard item={item} />
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-center md:justify-end mt-4">
                <Link to="/submit-review">
                  <MainBtn
                    variant="primary"
                    className="text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5"
                  >
                    {t("submit review")}
                  </MainBtn>
                </Link>
              </div>
            </div>
          </m.section>
        </LazyMotion>
      )}
    </FetchHandler>
  );
};

export default TestimonialsSection;
