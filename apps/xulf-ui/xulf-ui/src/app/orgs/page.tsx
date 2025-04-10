"use client";
import { signOut } from "next-auth/react";

export default function OrgsPage() {

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Prevent redirect to home
    localStorage.removeItem('session');  // If you're saving session data to localStorage for testing
    window.location.href = '/';          // Manually navigate to home page
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Organizations</h1>
      <ul className="mt-4 space-y-2">
      </ul>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
