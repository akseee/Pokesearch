import type { PokemonData } from '../../../shared/types/pokemon.types';

export function downloadCSV(data: PokemonData[]) {
  const headers: Array<keyof PokemonData> = [
    'name',
    'type',
    'id',
    'description',
    'image',
    'stats',
    'order',
  ];

  const rows = data.map((item) =>
    headers.map((col) => {
      const cell = item[col] ?? '';
      return `"${String(cell).replace(/"/g, '""')}"`;
    })
  );

  const csvContent = [headers, ...rows]
    .map((row) => row.join(','))
    .join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.setAttribute('download', `${data.length}_selected-pokemons`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
