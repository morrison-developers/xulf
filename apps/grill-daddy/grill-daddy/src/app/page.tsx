'use client';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Grill Daddy!</h1>
      <p>FAQ, project info, and instructions go here.</p>
      <button onClick={() => (window.location.href = '/dashboard')}>
        Start Cooking
      </button>
    </div>
  );
}
