'use client';

import styles from './ListCard.module.css';
import { type MouseEvent } from 'react';
import {
  getSpecificPokemonData,
  pokemonsActions,
} from '../model/pokemonsSlice';
import { useSelector } from 'react-redux';

import { useDispatch } from '../../../shared/config/store/store';
import Image from 'next/image';
import { useRouter } from '../../../shared/config/i18n/navigation';
import { PokemonData } from '../../../shared/types/pokemon.types';
import { useSearchParams } from 'next/navigation';

export const ListCard = ({ pokemon }: { pokemon: PokemonData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const isSelected = useSelector(getSpecificPokemonData(pokemon.name));

  const handleCardClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/pokemon/${pokemon.name}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleCheckboxClick = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();

    const checked = event.currentTarget.checked;

    if (checked) {
      dispatch(pokemonsActions.addPokemon(pokemon));
    } else {
      dispatch(pokemonsActions.removePokemon(pokemon));
    }
  };

  const { name, image, type, order } = pokemon;

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
          onChange={() => {}}
          onClick={handleCheckboxClick}
          checked={isSelected}
        />
      </div>

      <div className={styles['image-container']}>
        <Image
          className={styles.image}
          src={image || '/placeholder.png'}
          alt={name}
          loading="lazy"
          height={90}
          width={90}
        />
      </div>
      <div className={styles.title}>{name}</div>
      <div className={styles.order}>
        {order !== -1
          ? `#${order.toString().padStart(3, '0')}`
          : 'yet to classify'}
      </div>
      <div className={styles.type}>{type}</div>
    </li>
  );
};
