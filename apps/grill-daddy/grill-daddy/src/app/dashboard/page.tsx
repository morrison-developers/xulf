'use client';

import { GrillItemForm } from '../registry';
import { useRouter } from 'next/navigation';
import { useGrill } from '../context/GrillContext';

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
    <div>
      <h1>Dashboard</h1>
      <GrillItemForm />
      {/* Placeholder for streamlined info about added items */}
      <button onClick={handleNavigateToCooking} style={{ marginTop: '20px' }}>
        Go to Cooking Section
      </button>
    </div>
  );
}
