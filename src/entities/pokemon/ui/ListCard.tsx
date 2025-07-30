import { useLocation, useNavigate } from 'react-router';
import type { NamedAPIResource } from '../../../shared/types/api.types';
import { PokemonSkeletonCard } from './PokemonCardSkeleton';
import styles from './ListCard.module.css';
import { usePokemonData } from '../model/usePokemonData';
import { Loader } from '../../../shared/ui/Loader/Loader';
import { useDispatch } from '../../../app/store';
import { type ChangeEvent } from 'react';
import {
  getSpecificPokemonData,
  pokemonsActions,
} from '../model/pokemonsSlice';
import { useSelector } from 'react-redux';

export const ListCard = ({ pokemon }: { pokemon: NamedAPIResource }) => {
  const { pokemonData, isLoading, error } = usePokemonData(pokemon);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const isSelected = useSelector(getSpecificPokemonData(pokemon.name));

  const handleCardClick = () => {
    const search = location.search;
    navigate({ pathname: `/pokemon/${pokemon.name}`, search });
  };

  const handleCheckboxClick = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    const checked = event.target.checked;

    if (!pokemonData) return;

    if (checked) {
      dispatch(pokemonsActions.addPokemon(pokemonData));
    } else {
      dispatch(pokemonsActions.removePokemon(pokemonData));
    }
  };

  if (isLoading || !pokemonData) return <PokemonSkeletonCard />;

  if (error) {
    return <div>faield to laod data</div>;
  }

  const { name, image, type, order } = pokemonData;
  return (
    <li
      id={name.toLowerCase()}
      className={styles['card-layout-wrapper']}
      onClick={handleCardClick}
    >
      <div className={styles['checkbox-wrapper']}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onChange={handleCheckboxClick}
          checked={isSelected}
        />
      </div>

      <div className={styles['image-container']}>
        {isLoading ? (
          <div className={styles.image}>
            <Loader />
          </div>
        ) : (
          <img className={styles.image} src={image} alt={name} />
        )}
      </div>
      <div className={styles.title}>{name}</div>
      <div className={styles.order}>
        {`#${order.toString().padStart(3, '0')}`}
      </div>
      <div className={styles.type}>{type}</div>
    </li>
  );
};
