import {NextResponse} from 'next/server';
import {search} from '@/ai/flows/search-flow';

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json(
      {error: 'Query parameter is required'},
      {status: 400}
    );
  }

  try {
    const searchResponse = await search({query});
    return NextResponse.json(searchResponse.results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      {error: 'An error occurred during the search.'},
      {status: 500}
    );
  }
}
