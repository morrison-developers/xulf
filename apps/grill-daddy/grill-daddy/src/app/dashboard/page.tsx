'use client';

import { GrillItemForm, GrillItemPreview } from '../registry';
import { useRouter } from 'next/navigation';
import { useGrill } from '../context/GrillContext';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 40em;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`;

export default function Dashboard() {
  const { state } = useGrill(); // Access the current grill state
  const router = useRouter();

  const handleNavigateToCooking = () => {
    if (state.readyToCook) {
      router.push('/cooking'); // Navigate to the cooking section
    } else {
      alert('Add items to the grill to start cooking!');
    }
  };

  return (
    <DashboardContainer>
      <GrillItemForm />
      <GrillItemPreview />
      <button onClick={handleNavigateToCooking}>
        Go to Cooking Section
      </button>
    </DashboardContainer>
  );
}
