import React, { useMemo } from 'react';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

    //const heroes = getHeroesByPublisher(publisher);

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);


    return (
        <div className="card-columns animate__animated animate__fadeIn" style={ {display: 'flex', flexWrap: 'wrap'} }>
            {
                heroes.map(hero => {
                    return (
                        <HeroCard 
                            key={ hero.id }
                            { ...hero }
                        />
                    )
                })
            }
        </div>
    )
}
