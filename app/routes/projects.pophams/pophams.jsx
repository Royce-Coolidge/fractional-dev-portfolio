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
import styles from './pophams.module.css';

// TODO: Replace these with actual pophams images
// Required images:
// - pophams-background.jpg (hero background)
// - pophams-background-large.jpg
// - pophams-background-placeholder.jpg
import backgroundPlaceholder from '~/assets/sonocea-landing-page-placeholder.jpg';
import background from '~/assets/sonocea-landing-page-medium.jpg';
import backgroundLarge from '~/assets/sonocea-landing-page-large.jpg';

const title = 'Pophams Bakery';
const description =
  'Building a Shopify store for Pophams Bakery, a beloved London bakery known for their fresh pastries and artisan breads.';
const roles = ['Web Design', 'Shopify Development', 'Frontend Development'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const Pophams = () => {
  return (
    <>
      <ProjectContainer className={styles.pophams}>
        <ProjectBackground
          src={background}
          srcSet={`${background} 1080w, ${backgroundLarge} 2160w`}
          placeholder={backgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://pophamsbakery.com"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>The challenge</ProjectSectionHeading>
              <ProjectSectionText>
                Pophams Bakery needed an online presence that captured the warmth and quality of their in-store experience. The goal was to create a Shopify store that would allow customers to order their favourite pastries and breads for delivery or collection.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>The approach</ProjectSectionHeading>
              <ProjectSectionText>
                I worked closely with the Pophams team to understand their brand and customers. The design focuses on showcasing their beautiful products with high-quality photography and a clean, appetising layout that makes ordering easy and enjoyable.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ProjectSectionText>
                The new Shopify store has helped Pophams expand their reach beyond their physical locations, allowing customers across London to enjoy their fresh baked goods.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
