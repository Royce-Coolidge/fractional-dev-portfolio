import gamestackTexture2Large from '~/assets/kipper-mobile-screenshot-berry.png';
import gamestackTexture2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from '~/assets/kipper-mobile-screenshot-berry.png';
import gamestackTextureLarge from '~/assets/kipper-mobile-screenshot-home.png';
import gamestackTexturePlaceholder from '~/assets/gamestack-login-placeholder.jpg';
import gamestackTexture from '~/assets/kipper-mobile-screenshot-home.png';
import imageSketchLandingPageLarge from '~/assets/sketch-landing.jpg';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import imageSketchLandingPage from '~/assets/sketch-landing.jpg';
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
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

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
        title="Welcome to the Sonic Revolution"
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
        title="Shopify theme customisation for Kipper"
        description="Customising a Shopify theme to create a seamless shopping experience for Kipper, a high-end online  store for bespoke women's suits"
        buttonText="View website"
        buttonLink="https://kipper.club"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${gamestackTexture} 375w, ${gamestackTextureLarge} 750w`,
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: `${gamestackTexture2} 375w, ${gamestackTexture2Large} 750w`,
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Webflow redesign for Sketch Up"
        description='Design and development for SketchUp’s "Design Sprint Challenge" campaign, including website design, development, and digital assets'
        buttonText="Visit website"
        buttonLink="https://designers.sketchup.com/"
        model={{
          type: 'laptop',
          alt: 'SketchUp landing page',
          textures: [
            {
              srcSet: `${imageSketchLandingPage} 800w, ${imageSketchLandingPageLarge} 1920w`,
              placeholder: sliceTexturePlaceholder,
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
