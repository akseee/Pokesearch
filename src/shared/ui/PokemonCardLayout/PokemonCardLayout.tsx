import { Fragment, type ReactNode } from 'react';
import { Loader } from '../Loader/Loader';

export const PokemonCardLayout = ({
  loading = false,
  image,
  title,
  lines,
}: {
  loading?: boolean;
  image: ReactNode;
  title: ReactNode;
  lines: ReactNode[];
}) => (
  <div>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <div>{image}</div>
        <div>{title}</div>
        <ul>
          {lines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </Fragment>
    )}
  </div>
);
