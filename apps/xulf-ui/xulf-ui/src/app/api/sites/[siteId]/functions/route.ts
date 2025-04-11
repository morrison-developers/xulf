import { prisma } from '@xulf/db';
import { NextResponse } from 'next/server';
import { SiteJson } from '../../../../types/layout'; // Import SiteJson type

export async function POST(req: Request, { params }: { params: { siteId: string } }) {
  const { siteId } = params;

  try {
    const { nodes, edges }: SiteJson['functionGraph'] = await req.json();

    // Log received data
    console.log('Received functionGraph data:', { nodes, edges });
    if (!nodes || !edges) {
      console.error('Missing nodes or edges');
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    // Serialize the data to JSON string
    const functionGraphString: string = JSON.stringify({ nodes, edges });
    console.log('Serialized functionGraph:', functionGraphString);

    // Save the functionGraph to the database
    const site = await prisma.site.update({
      where: { id: siteId },
      data: {
        functionGraph: functionGraphString,
      },
    });

    console.log('Saved functionGraph to site:', site);  // Log the saved site data
    return NextResponse.json(site);
  } catch (error) {
    console.error('Failed to save function graph', error);
    return NextResponse.json({ error: 'Failed to save function graph' }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { siteId: string } }) {
  const { siteId } = params;

  try {
    const site = await prisma.site.findUnique({
      where: { id: siteId },
      select: { functionGraph: true },
    });

    if (!site || !site.functionGraph) {
      console.log(`Function graph not found for siteId: ${siteId}`);
      return NextResponse.json({ error: 'Function graph not found' }, { status: 404 });
    }

    // Log the retrieved functionGraph
    console.log('Retrieved functionGraph:', site.functionGraph);

    // Ensure that functionGraph is a string before parsing
    if (typeof site.functionGraph === 'string') {
      const functionGraph: SiteJson['functionGraph'] = JSON.parse(site.functionGraph);
      return NextResponse.json(functionGraph); // Return the parsed functionGraph
    }

    console.log('Invalid functionGraph format');
    return NextResponse.json({ error: 'Invalid functionGraph format' }, { status: 400 });

  } catch (error) {
    console.error('Failed to fetch function graph', error);
    return NextResponse.json({ error: 'Failed to fetch function graph' }, { status: 500 });
  }
}
