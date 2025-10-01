

// Earth component

import { Suspense, useMemo } from 'react';
import { ThemeProvider } from '~/components/theme-provider';
import { Earth } from '~/components/earth/earth';
import {
    EarthSection,
    ProjectSection,
    ProjectSectionContent,
    ProjectTextRow,
    ProjectSectionHeading,
    ProjectSectionText,
} from '~/components/earth/sections';


export const EarthComponent = () => (
    <ThemeProvider theme="dark" data-invert>
        <Suspense>
            <Earth
              className={styles.earth}
              hideMeshes={useMemo(
                () => ['Atmosphere', 'EarthPartial', 'Chunk', 'EarthFull'],
                []
              )}
              position={useMemo(() => [0, -0.4, 0], [])}
              labels={useMemo(
                () => [
                  {
                    position: [0.54, 0.19, 0.18],
                    text: 'Pacific ring of fire',
                    hidden: true,
                  },
                  {
                    text: 'Lisbon',
                    position: [-0.61, 0.1, -0.1],
                    hidden: true,
                  },
                  {
                    text: "Yangon, Myanmar",
                    position: [0.1, -0.29, 0.58],
                    hidden: true,
                  },
                  {
                    position: [0.47, -0.38, 0.04],
                    text: 'Ruapehu',
                    hidden: true,
                  },
                  {
                    position: [0.22, 0.44, -0.35],
                    text: 'St. Helens',
                    hidden: true,
                  },
                  {
                    position: [0.16, -0.06, 0.58],
                    text: 'Krakatoa',
                    hidden: true,
                  },
                  {
                    position: [0.11, 0.2, -0.56],
                    text: 'Parícutin',
                    hidden: true,
                  },
                  {
                    position: [0.52, 0.2, -0.23],
                    text: 'Kīlauea',
                    hidden: true,
                  },
                  {
                    position: [-0.24, 0.75, 0.24],
                    text: 'Mantle',
                    delay: 800,
                    hidden: true,
                  },
                  {
                    position: [-0.24, 0.55, 0.24],
                    text: 'Outer core',
                    delay: 800,
                    hidden: true,
                  },
                  {
                    position: [-0.24, 0.35, 0.24],
                    text: 'Inner core',
                    delay: 800,
                    hidden: true,
                  },
                ],
                []
              )}
              scale={0.8}
            >
              <EarthSection
                scrim
                animations={['0:loop']}
                camera={[0, 0, 1.5]}
                meshes={['Atmosphere', 'EarthFull']}
                 labels={['Yangon, Myanmar']}
              >
                <ProjectSection>
                  <ProjectSectionContent>
                    <ProjectTextRow center>
                      <ProjectSectionHeading>
                        Next-generation learning experiences
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        The flexibility of the product allowed for developers to create
                        engaging interactive experiences as highly configurable plugins
                        that could then be used and manipulated by learning designers.
                      </ProjectSectionText>
                    </ProjectTextRow>
                  </ProjectSectionContent>
                </ProjectSection>
              </EarthSection>
              <EarthSection
                animations={['0:loop']}
                camera={[-3, 0.5, 1.4]}
                meshes={['Atmosphere', 'EarthFull']}
              
               
              />
              <EarthSection
                animations={['0:loop']}
                camera={[-1.3, 0.4, 0]}
                meshes={['Atmosphere', 'EarthFull']}
                labels={['Lisbon']}
              >
                <ProjectSection>
                  <ProjectSectionContent width="xl">
                    <ProjectTextRow justify="end" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        Bringing 3D into learning
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        One really cool example is the 3D screen plugin. Learning
                        designers can load any model into it and then configure camera
                        positions to animate to for each section.
                      </ProjectSectionText>
                    </ProjectTextRow>
                  </ProjectSectionContent>
                </ProjectSection>
              </EarthSection>
              <EarthSection
                animations={['0:loop']}
                camera={[-1.17, 0.3, -1]}
                meshes={['Atmosphere', 'EarthFull']}
                labels={['Lisbon']}
               
              >
                <ProjectSection>
                  <ProjectSectionContent width="xl">
                    <ProjectTextRow justify="start" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        Interactivity
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        Learners can then be directed to specific parts of the model and
                        shown labels. They’re also able to click and drag to orbit around
                        and freely explore at any time.
                      </ProjectSectionText>
                    </ProjectTextRow>
                  </ProjectSectionContent>
                </ProjectSection>
              </EarthSection>
              
              <EarthSection
                animations={['0:loop']}
                camera={[-2, 1.02, -3]}
                meshes={['EarthPartial', 'Chunk']}
                labels={['Mantle', 'Outer core', 'Inner core']}
              >
                <ProjectSection>
                  <ProjectSectionContent width="xl">
                    <ProjectTextRow justify="end" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        Animation
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        Learning designers can pick an animation included in the model to
                        play or loop for any section without having to use any complex
                        animation tools.
                      </ProjectSectionText>
                    </ProjectTextRow>
                  </ProjectSectionContent>
                </ProjectSection>
              </EarthSection>
              <EarthSection
                
                animations={['0:loop']}
                camera={[0.37, 1.02, 1.84]}
                meshes={['Atmosphere', 'EarthFull']}
              />
            </Earth>
          </Suspense>
 </ThemeProvider>
        
);
