import type { ReactNode } from 'react';

export const PokemonCardLayout = ({
  image,
  title,
  lines,
}: {
  image: ReactNode;
  title: ReactNode;
  lines: ReactNode[];
}) => (
  <div>
    <div>{image}</div>
    <div>{title}</div>
    <ul>
      {lines.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  </div>
);
