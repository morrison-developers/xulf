import { componentRegistry } from '@xulf/editor-ui';

export function CanvasRenderer({ layout }: { layout: any[] }) {
  return (
    <div className="space-y-4">
      {layout.map((module) => {
        const Component = componentRegistry[module.type];
        if (!Component) {
          return (
            <div key={module.id} className="border p-4 text-red-500">
              Unknown module type: {module.type}
            </div>
          );
        }
        return <Component key={module.id} {...module.props} />;
      })}
    </div>
  );
}
