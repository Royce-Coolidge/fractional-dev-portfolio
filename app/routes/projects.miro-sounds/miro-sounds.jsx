import { Footer } from '~/components/footer';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import styles from './miro-sounds.module.css';

// TODO: Replace these with actual Miro Sounds images
// Required images:
// - miro-sounds-background.jpg (hero background)
// - miro-sounds-background-large.jpg
// - miro-sounds-background-placeholder.jpg
import backgroundPlaceholder from '~/assets/sonocea-landing-page-placeholder.jpg';
import background from '~/assets/sonocea-landing-page-medium.jpg';
import backgroundLarge from '~/assets/sonocea-landing-page-large.jpg';

const title = 'Miro Sounds';
const description =
  'A custom-built website for Miro Sounds, a music agency connecting artists with booking opportunities and event organisers.';
const roles = ['Web Design', 'Frontend Development', 'Custom CMS'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const MiroSounds = () => {
  return (
    <>
      <ProjectContainer className={styles.miroSounds}>
        <ProjectBackground
          src={background}
          srcSet={`${background} 1080w, ${backgroundLarge} 2160w`}
          placeholder={backgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.mirosounds.com"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>The challenge</ProjectSectionHeading>
              <ProjectSectionText>
                Miro Sounds needed a professional online platform to showcase their roster of artists and streamline the booking process. The site needed to be visually striking to reflect the creative nature of the music industry while remaining functional and easy to navigate for event organisers and venues.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>The approach</ProjectSectionHeading>
              <ProjectSectionText>
                I designed and developed a custom website that puts the artists front and centre. The site features dynamic artist profiles, an integrated booking enquiry system, and a content management system that allows the Miro Sounds team to easily update artist information, add new talent, and manage bookings.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ProjectSectionText>
                The new website has helped Miro Sounds establish a stronger online presence, making it easier for venues and event organisers to discover and book their artists. The streamlined booking process has improved response times and client satisfaction.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
