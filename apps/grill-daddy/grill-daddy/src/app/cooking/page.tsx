'use client';

import { useGrill } from '../context/GrillContext';
import { useRouter } from 'next/navigation';
import { GrillItemCard } from '../registry';
import { cookData } from '../registry';

export default function Cooking() {
  const { state, dispatch, onComplete } = useGrill();
  const router = useRouter();

  const handleStartCooking = () => {
    dispatch({ type: 'START_COOKING' });
  };

  const handleEndCooking = () => {
    dispatch({ type: 'END_COOKING' }); // Dispatch state update
    router.push('/dashboard'); // Redirect explicitly
  };

  return (
    <div>
      <h1>Cooking Mode</h1>
      <h2>Active Items</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {state.activeGrillItems.map((item) => (
          <GrillItemCard
            key={item.id}
            item={item}
            cookingMode={state.cookingMode}
            onComplete={onComplete} // Allow marking items as complete
            cookData={cookData}
            onRemove={() => console.log('removed')} // Disable onRemove in cookingMode
          />
        ))}
      </div>
      {!state.cookingMode ? (
        <button onClick={handleStartCooking}>Start Cooking</button>
      ) : (
        <button onClick={handleEndCooking}>End Cooking</button>
      )}
      <button disabled>Enter Demo Mode (Coming Soon)</button>
    </div>
  );
}