import React from 'react';
import styled from 'styled-components';

// Styled Components
export const StyledParagraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #ddd; /* Example color */
`;

export const StyledHeading = styled.h3`
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #fff; /* Example color */
`;

const StyledStrong = styled.strong`
  font-weight: bold;
  color: #fff; /* Strong text color */
`;

const StyledEmphasis = styled.em`
  font-style: italic;
  color: #fff; /* Color for emphasized text */
`;

// AboutInner Component
export const AboutInner = () => {
  return (
  <>
    <StyledParagraph>
      Nicoletta Berry is a dynamic soprano, shaping a career that blends her passion for classical voice, theatre, and artistic collaboration with visionary artistic projects. The 2024-2025 season marks an exciting chapter in her journey.
    </StyledParagraph>

    <StyledParagraph>
      In February, she will perform at the Isabella Stewart Gardner Museum in Boston, singing a newly commissioned work by composer Phil Kline. This will be followed by a reprise of New York Festival of Song’s Tour de France program, collaborating with beloved artists Steven Blier and Bénédicte Jourdois. Then, Nicoletta is co-producing and making her curatorial debut in Orpheus//Eurydice as part of City Lyric Opera’s Baroque Festival, featuring the premiere of Eurydice, a commissioned work by Rebecca Scout Nelson.
    </StyledParagraph>

    <StyledParagraph>
      In 2024, Nicoletta made her Carnegie Hall debut as the soprano soloist in Beethoven’s Christ on the Mount of Olives with the Cecilia Chorus of New York, conducted by Mark Shapiro. Soon after, she performed the role of Despina in Così Fan Tutte as a young artist with Opera Saratoga. She has also been a frequent collaborator with New York Festival of Song, first appearing as a participant in Caramoor’s Schwab Vocal Rising Star residency.
    </StyledParagraph>

    <StyledParagraph>
      Nicoletta graduated from the Manhattan School of Music in 2020 with a Bachelor’s degree in Classical Voice and earned her Master’s degree from the Juilliard School in 2023, where she was a Toulmin Scholar. Throughout her studies at both institutions, Nicoletta trained with the esteemed Marlena Malas, with whom she also worked closely for five years at the Chautauqua Institution.
    </StyledParagraph>

    <StyledParagraph>
      During her time at Chautauqua, she performed roles such as Tytania in Britten’s A Midsummer Night’s Dream and Susanna in Le Nozze di Figaro.
    </StyledParagraph>

    <StyledParagraph>
      At Juilliard, Nicoletta expanded her artistic repertoire, performing roles like Clizia in Handel’s Teseo and Giunone in Luigi Rossi’s Orfeo. It was through these projects her love of performing baroque music was fostered and cultivated, collaborating often with Juilliard415 and Twelfth Night Ensemble. A highlight of her time at Juilliard was making her Alice Tully Hall debut as the soprano soloist in Claude Vivier’s Lonely Child, conducted by Barbara Hannigan.
    </StyledParagraph>

    <StyledParagraph>
      Now based in New York City, where she grew up, Nicoletta remains committed to fostering a vibrant arts community. She is grateful to continue her journey, working to help keep the arts thriving in diverse communities and engaging with audiences through her work.
    </StyledParagraph>

    <StyledParagraph>
      Nicoletta believes that artists have always provided the space for humanity’s pent-up thoughts and emotions, making the arts essential to a healthy, thriving society. For her, the singer’s role in a community has often been that of an orator, a keeper of stories, values, and histories. Being a singer, she feels, requires a real commitment to understanding our shared history, myths, humor, spirituality, and psychology, so that we stay connected to what we say and perform. Through this art form, she hopes to offer relief, inspiration, and a deeper connection to one another.
    </StyledParagraph>
  </>
  );
};
