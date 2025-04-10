'use client';

interface EditorShellProps {
  siteJson: any; // Adjust to your layout type later
}

export default function EditorShell({ siteJson }: EditorShellProps) {
  return (
    <div className="h-screen w-full overflow-hidden flex">
      {/* Left Panel */}
      <aside className="w-64 border-r bg-white p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold mb-4">Modules</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>RichText</li>
          <li>Image</li>
          <li>Embed</li>
          <li>Modal</li>
        </ul>
      </aside>

      {/* Center Canvas */}
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <h2 className="text-sm font-semibold mb-4">Canvas</h2>
        <div className="h-full w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
          Drop modules here
        </div>
      </main>

      {/* Right Panel */}
      <aside className="w-80 border-l bg-white p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold mb-4">Edit Props</h2>
        <p className="text-sm text-gray-500">Select a module to begin editing its props.</p>
      </aside>
    </div>
  );
}
