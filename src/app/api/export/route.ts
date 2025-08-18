import { NextRequest, NextResponse } from 'next/server';
import { PokemonData } from '../../../shared/types/pokemon.types';

function generateCSV(data: PokemonData[]): string {
  const headers: Array<keyof PokemonData> = [
    'name',
    'type',
    'id',
    'description',
    'image',
  ];

  const rows = data.map((item) =>
    headers.map((col) => `"${String(item[col] ?? '').replace(/"/g, '""')}"`)
  );

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
}

export async function POST(req: NextRequest) {
  try {
    const data: PokemonData[] = await req.json();
    const csv = generateCSV(data);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="selected-pokemons.csv"`,
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'failed to generate CSV' },
      { status: 500 }
    );
  }
}
