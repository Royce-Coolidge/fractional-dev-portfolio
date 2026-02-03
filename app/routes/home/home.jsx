import pophams2Large from '~/assets/pophams-mobile-2.png';
import pophams2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import pophams2 from '~/assets/pophams-mobile-2.png';
import pophamsLarge from '~/assets/pophams-mobile-1.png';
import pophamsPlaceholder from '~/assets/gamestack-login-placeholder.jpg';
import pophams from '~/assets/pophams-mobile-1.png';
import taurusMobileScreenPlaceholder from '~/assets/taurus-1-placeholder.jpg';
import taurusMobileScreen2Placeholder from '~/assets/taurus-2-placeholder.jpg';
import miroPhoneVideo from '~/assets/miro-phone.mp4';
import miroPhone1 from '~/assets/miro-1.png';
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
        title="Pophams Bakery"
        description="Building an online store for Pophams Bakery, a beloved London bakery known for their fresh pastries and artisan breads"
        buttonText="View Pophams Bakery"
        buttonLink="https://pophamsbakery.com"
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
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Miro Sounds"
        description="A custom-built website for a music agency connecting artists with booking opportunities"
        buttonText="View website"
        buttonLink="https://www.mirosounds.com"
        model={{
          type: 'phone',
          alt: 'Miro Sounds mobile website',
          textures: [
            {
              srcSet: `${miroPhone1} 375w, ${miroPhone1} 750w`,
              placeholder: taurusMobileScreenPlaceholder,
            },
            {
              srcSet: miroPhoneVideo,
              placeholder: taurusMobileScreen2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
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
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
