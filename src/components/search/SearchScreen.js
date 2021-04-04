import React, { useMemo, useState } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router'
import { HeroCard } from '../heroes/HeroCard'
import { getHeroeByName } from '../../selectors/getHeroByName'

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q  = '' } = queryString.parse(location.search);

    const [value, setValue] = useState(q);

    const handleInput = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        history.push(`?q=${ value }`)
    }

    const heroesFiltered = useMemo(() => getHeroeByName(value), [ q ]);

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form>
                        <input 
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            onChange={ handleInput }
                            value={value}
                        />

                        <button
                             type="submit"
                             className="btn m-1 btn-block btn-outline-primary"
                             onClick={ handleSubmit }  
                        >
                            Search
                        </button>
                    </form>

                </div>

                <div className="col-7">
                    <h4> Results </h4>
                    <hr />


                    {
                        (q === '') && 
                            <div className="alert alert-info">
                                search a hero
                            </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0) && 
                            <div className="alert alert-danger">
                                There is no a hero with { q }
                            </div>
                    }

                    {
                        heroesFiltered.map((hero) => {
                            return ( 
                                <HeroCard 
                                    key={hero.id}
                                    {... hero}
                                /> 
                            )
                        })
                    }

                </div>
            </div>


        </div>
    )
}
