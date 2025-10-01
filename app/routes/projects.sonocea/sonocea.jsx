import backgroundSonLarge from '~/assets/son-background-large.jpg';
import backgroundSonPlaceholder from '~/assets/son-background-placeholder.jpg';
import imageSonLandingPageLarge from '~/assets/sonocea-landing-page-large.jpg';
import imageSonLandingPagePlaceholder from '~/assets/sonocea-landing-page-placeholder.jpg';
import imageSonLandingPage from '~/assets/sonocea-landing-page-medium.jpg';
import imageSprBackgroundVolcanismLarge from '~/assets/spr-background-volcanism-large.jpg';
import imageSprBackgroundVolcanismPlaceholder from '~/assets/spr-background-volcanism-placeholder.jpg';
import imageSprBackgroundVolcanism from '~/assets/spr-background-volcanism.jpg';
import imageSonBackground from '~/assets/son-background.jpg';
import imageSonBackgroundLarge from '~/assets/son-background-large.jpg';
import imageSonBackgroundPlaceholder from '~/assets/son-background-placeholder.jpg';

import imageSonComponentsDarkPlaceholder from '~/assets/son-components-dark-placeholder.jpg';
import imageSonComponentsDark from '~/assets/son-components-dark.png';
import imageSonComponentsDarkLarge from '~/assets/son-components-dark-large.jpg';
import imageSonComponentsLight from '~/assets/son-components-light.png';
import imageSonComponentsLightLarge from '~/assets/son-components-light-large.jpg';
import imageSonComponentsLightPlaceholder from '~/assets/son-components-light-placeholder.jpg';



import videoSonLogoDark from '~/assets/sonocea-logo-dark.mp4';

import imageSonWireframe1 from '~/assets/son-wireframe-1.png';
import imageSonWireframe2 from '~/assets/son-wireframe-2.png';

import videoSonMotionLarge from '~/assets/son-landing-page-scroll-large.mp4';
import videoSonMotion from '~/assets/son-landing-page-scroll.mp4';
import videoSonMotionPlaceholder from '~/assets/spr-motion-placeholder.jpg';

import imageSonBackgroundTwoLarge from '~/assets/son-background-clouds-large.jpg';

import imageSonBackgroundTwo from '~/assets/son-background-clouds.jpg';

import imageSprSchema1DarkLarge from '~/assets/spr-schema-1-dark-large.png';
import imageSprSchema1DarkPlaceholder from '~/assets/spr-schema-1-dark-placeholder.png';
import imageSprSchema1Dark from '~/assets/spr-schema-1-dark.png';
import imageSprSchema1LightLarge from '~/assets/spr-schema-1-light-large.png';
import imageSprSchema1LightPlaceholder from '~/assets/spr-schema-1-light-placeholder.png';
import imageSprSchema1Light from '~/assets/spr-schema-1-light.png';
import imageSprSchema2DarkLarge from '~/assets/spr-schema-2-dark-large.png';
import imageSprSchema2DarkPlaceholder from '~/assets/spr-schema-2-dark-placeholder.png';
import imageSprSchema2Dark from '~/assets/spr-schema-2-dark.png';
import imageSprSchema2LightLarge from '~/assets/spr-schema-2-light-large.png';
import imageSprSchema2LightPlaceholder from '~/assets/spr-schema-2-light-placeholder.png';
import imageSprSchema2Light from '~/assets/spr-schema-2-light.png';
import imageSprStoryboarderDarkLarge from '~/assets/spr-storyboarder-dark-large.png';
import imageSprStoryboarderDarkPlaceholder from '~/assets/spr-storyboarder-dark-placeholder.png';
import imageSprStoryboarderDark from '~/assets/spr-storyboarder-dark.png';
import imageSprStoryboarderLightLarge from '~/assets/spr-storyboarder-light-large.png';
import imageSprStoryboarderLightPlaceholder from '~/assets/spr-storyboarder-light-placeholder.png';
import imageSprStoryboarderLight from '~/assets/spr-storyboarder-light.png';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { SegmentedControl, SegmentedControlOption } from '~/components/segmented-control';
import { ThemeProvider, useTheme } from '~/components/theme-provider';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { Suspense, lazy, useMemo } from 'react';
import { media } from '~/utils/style';
import styles from './sonocea.module.css';

const Earth = lazy(() => import('./earth').then(module => ({ default: module.Earth })));
const EarthSection = lazy(() =>
  import('./earth').then(module => ({ default: module.EarthSection }))
);

const title = 'Sonocea® — The Sound of Science';
const description =
  "I worked as the dev lead on the creation of Sonocea's Website. We took the platform in a bold new direction, focusing on becoming the best tool for learning designers.";
const roles = [
  'UX and UI Design',
  'Front End Development',
  'Motion Design',
];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const Sonocea = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const themes = ['dark', 'light'];

  const handleThemeChange = index => {
    toggleTheme(themes[index]);
  };

  return (
    <>
      <ProjectContainer>
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={imageSonBackground}
          srcSet={`${imageSonBackground} 1080w, ${imageSonBackgroundLarge} 2160w`}
          placeholder={imageSonBackgroundPlaceholder}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.sonocea.com/"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={theme}
              srcSet={`${imageSonLandingPage} 1280w, ${imageSonLandingPageLarge} 2560w`}
              width={1280}
              height={800}
              placeholder={imageSonLandingPagePlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="The aero lesson builder app dragging an audio component into a screen about plant cells."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>The challenge</ProjectSectionHeading>
            <ProjectSectionText>
              Develop a new website for Sonocea – a breakthrough sound augmentation technology in the wellness space.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection light={isDark}>
          <ProjectSectionContent>
            <Image
              key={theme}
              srcSet={
                isDark
                  ? `${imageSonComponentsDark} 1024w, ${imageSonComponentsDarkLarge} 2048w`
                  : `${imageSonComponentsLight} 1024w, ${imageSonComponentsLightLarge} 2048w`
              }
              width={1024}
              hright={800}
              placeholder={
                isDark
                  ? imageSonComponentsDarkPlaceholder
                  : imageSonComponentsLightPlaceholder
              }
              alt={`A set of ${theme} themed components for the aero design system`}
              sizes="100vw"
            />
            <ProjectTextRow>
              <SegmentedControl
                currentIndex={themes.indexOf(theme)}
                onChange={handleThemeChange}
              >
                <SegmentedControlOption>Dark theme</SegmentedControlOption>
                <SegmentedControlOption>Light theme</SegmentedControlOption>
              </SegmentedControl>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionHeading>The development approach</ProjectSectionHeading>
              <ProjectSectionText>
                I knew Sonocea needed something. I took inspiration from natural elements like water and sound waves to create a fluid, dynamic design that reflects the brand's innovative approach to sound technology. I built them a custom ThreeJS web application that showcased their technology in an interactive way. I integrated GSAP animations to create smooth transitions, text reveal effects, and smooth scroll triggers that felt like breathing.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>

            <Image
                raised
                 srcSet={
                `${videoSonMotion} 1280w, ${videoSonMotionLarge} 2560w`
              }
                width={1280}
                height={800}
                placeholder={videoSonMotionPlaceholder}
                alt="A learning designer building and deploying an interactive lesson on volcanism using the app."
                sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
              />
           
          
          </ProjectSectionContent>
        </ProjectSection>
        <ThemeProvider theme="dark" data-invert>
          <ProjectSection
            backgroundOverlayOpacity={0.5}
            backgroundElement={
              <Image
                
                srcSet={`${imageSonBackgroundTwo} 1280w, ${imageSonBackgroundTwoLarge} 2560w`}
                width={1280}
                height={900}
                placeholder={imageSprBackgroundVolcanismPlaceholder}
                alt="A dramatic ocean scene with lava forming a new land mass."
                sizes="100vw"
              />
            }
          >
            <ProjectSectionColumns width="full">
              <ProjectSectionContent width="full">
                <ProjectTextRow width="s">
                  <ProjectSectionHeading>Motion design</ProjectSectionHeading>
                  <ProjectSectionText>
                    Animation was a core principle in making the site feel alive and dynamic. I created a series of custom motion graphics that were used throughout the site to illustrate key concepts and features of the technology. These animations were designed to be both informative and visually engaging, helping to communicate the brand's message in a memorable way.
                  </ProjectSectionText>
                </ProjectTextRow>
              </ProjectSectionContent>
              
            </ProjectSectionColumns>
          </ProjectSection>
        </ThemeProvider>
       
        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>
                  A custom design system for a unique brand
                </ProjectSectionHeading>
                <ProjectSectionText>
                  I developed a custom design system that was tailored to Sonocea's unique brand identity. The design system included a range of components and styles that were designed to be flexible and adaptable, allowing for easy customization and scalability as the brand grew and evolved.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
          
         <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={ `${imageSonWireframe2} 260w, ${imageSonWireframe2} 520w`}
                width={260}
                height={660}
                placeholder={
                  isDark
                    ? imageSprSchema1DarkPlaceholder
                    : imageSprSchema1LightPlaceholder
                }
                alt="Configuration options for text."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
              <Image      

                className={styles.sidebarImage}
                srcSet={`${imageSonWireframe1} 260w, ${imageSonWireframe1} 520w`}                 width={260}
                height={660}
                placeholder={
                  isDark
                    ? imageSprSchema2DarkPlaceholder
                    : imageSprSchema2LightPlaceholder
                }
                alt="Configuration options for text."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
       
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
            
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ProjectSectionText>
                The project was a success and Sonocea are now moving towards creating an app to deliver their sonic augmentation technology to the world. Look out for the app on the App Store and Google Play.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
