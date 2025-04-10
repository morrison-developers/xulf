// components/editor/EditorShell.tsx (or from @xulf/editor later)
export default function EditorShell({ siteJson }: { siteJson: any }) {
  return (
    <div className="border rounded p-6 bg-white shadow">
      <h2 className="text-lg font-semibold mb-4">Editor Shell (MVP)</h2>
      <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
        {JSON.stringify(siteJson, null, 2)}
      </pre>
    </div>
  );
}
