'use client';

import styled from 'styled-components';
import { FloatingNavBar } from '@xulf/ui';

const StyledPage = styled.div`
  .page {
  }
`;

export default function Index() {
  return (
    <StyledPage>
      <FloatingNavBar>
        <h1>Sweet Sye Entertainment</h1>
      </FloatingNavBar>
    </StyledPage>
  );
}
