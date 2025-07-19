import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon', () => {
    return HttpResponse.json({
      count: 3,
      next: '/next',
      previous: null,
      results: [
        { name: 'pokemon1', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'pokemon2', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'pokemon3', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
      ],
    });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/:id', ({ params }) => {
    const { id } = params;

    if (id === 'notfound') {
      return new Response(null, { status: 404 });
    }

    return HttpResponse.json({
      name: `pokemon${id}`,
      id: Number(id),
      order: Number(id),
      sprites: {
        other: {
          ['official-artwork']: {
            front_default: `https://pokeapi.co/media/sprites/${id}.png`,
          },
          dream_world: {
            front_default: `https://pokeapi.co/media/dream/${id}.svg`,
          },
        },
      },
      types: [{ type: { name: 'fire' } }],
      stats: [
        { base_stat: 1, stat: { name: 'hp' } },
        { base_stat: 1, stat: { name: 'attack' } },
      ],
    });
  }),
];
