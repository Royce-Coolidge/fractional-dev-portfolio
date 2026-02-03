import pophams2Large from '~/assets/pophams-mobile-2.png';
import pophams2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import pophams2 from '~/assets/pophams-mobile-2.png';
import pophamsLarge from '~/assets/pophams-mobile-1.png';
import pophamsPlaceholder from '~/assets/gamestack-login-placeholder.jpg';
import pophams from '~/assets/pophams-mobile-1.png';
import taurusMobileScreen from '~/assets/taurus-1.png';
import taurusMobileScreenPlaceholder from '~/assets/taurus-1-placeholder.jpg';
import taurusMobileScreen2 from '~/assets/taurus-2.png';
import taurusMobileScreen2Placeholder from '~/assets/taurus-2-placeholder.jpg';
import imageCapsuleScroll from '~/assets/capsule-scroll.jpg';
import imageCapsuleScrollLarge from '~/assets/capsule-scroll-large.jpg';
import imageCapsuleScrollPlaceholder from '~/assets/capsule-scroll-placeholder.jpg';
import sonoceaTextureLarge from '~/assets/sonocea-landing-page-large.jpg';
import sonoceaPlaceholder from '~/assets/sonocea-landing-page-placeholder.jpg';
import sonoceaTexture from '~/assets/sonocea-landing-page-medium.jpg';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a creative developer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, projectFour, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Sonocea's website - built from scratch"
        description="Developing a wellness platform to introduce sonic augmentation technology to the world"
        buttonText="View project"
        buttonLink="/projects/sonocea"
        model={{
          type: 'laptop',
          alt: 'Sonocea landing page',
          textures: [
            {
              srcSet: `${sonoceaTexture} 800w, ${sonoceaTextureLarge} 1479w`,
              placeholder: sonoceaPlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Pophams Bakery"
        description="Building an online store for Pophams Bakery, a beloved London bakery known for their fresh pastries and artisan breads"
        buttonText="View project"
        buttonLink="/projects/pophams"
        model={{
          type: 'phone',
          alt: 'Pophams Bakery mobile store',
          textures: [
            {
              srcSet: `${pophams} 375w, ${pophamsLarge} 750w`,
              placeholder: pophamsPlaceholder,
            },
            {
              srcSet: `${pophams2} 375w, ${pophams2Large} 750w`,
              placeholder: pophams2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Scroll Animation for an Architecture website"
        description='Creating a scroll animation for an architecture website'
        buttonText="Visit website"
        buttonLink="https://capsule-scroll.pages.dev/"
        model={{
          type: 'laptop',
          alt: 'SketchUp landing page',
          textures: [
            {
              srcSet: `${imageCapsuleScroll} 800w, ${imageCapsuleScrollLarge} 1920w`,
              placeholder: imageCapsuleScrollPlaceholder,
            },
          ],
        }}
      />
        <ProjectSummary
        id="project-4"
        alternate
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="Website for an adventure travel company"
        description="Design and development for Taurus & Leo, an adventure travel company"
        buttonText="View website"
        buttonLink="https://www.taurusandleo.co.uk/"
        model={{
          type: 'phone',
          alt: 'Taurus & Leo landing page',
          textures: [
            {
              srcSet: `${taurusMobileScreen} 375w, ${taurusMobileScreen} 750w`,
              placeholder: taurusMobileScreenPlaceholder,
            },
            {
              srcSet: `${taurusMobileScreen2} 375w, ${taurusMobileScreen2} 750w`,
              placeholder: taurusMobileScreen2Placeholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
