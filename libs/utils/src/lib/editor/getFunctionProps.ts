export function getFunctionProps(
  id: string,
  connections: { input: string; event: string }[] = []
) {
  const props: Record<string, any> = {};
  for (const { input, event } of connections) {
    if (event === 'onClick') {
      props['openTriggerId'] = input;
    }
  }
  return props;
}
