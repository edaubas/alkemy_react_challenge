import React, { useState } from 'react';
import HeroDesc from './HeroDesc';
import HeroStats from './HeroStats';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addHeroToTeam } from '../state/action-creators/teamActions';

export default function HeroCard(props) {

    const [viewDetails, setViewDetails] = useState(false);
    const team = useSelector(state => state.team)
    const dispatch = useDispatch();

    const onClickAddHero = (hero) => {
        if (hero.biography.alignment === 'good') {

            if (team.good.length === 3) {
                alert('Good team is full!!');
            } else {
                dispatch(addHeroToTeam(hero));
            }

        } else {

            if (team.bad.length === 3) {
                alert('Bad team is full!!');
            } else {
                dispatch(addHeroToTeam(hero));
            }

        }
    }

    const swapDescStat = () => {
        viewDetails === true ? setViewDetails(false) : setViewDetails(true)
    }

    return (

        <div
            className={'card-hero rounded p-0 bg-gradient ' + (props.hero.biography.alignment === 'good' ? 'heroGood' : 'heroBad')}
            style={{ maxWidth: '10rem', margin: '1rem' }}>
            <div
                className='rounded-top m-0'
                style={{ height: '12rem', backgroundImage: 'url(' + props.hero.image.url + ')', backgroundSize: 'cover' }}>
            </div>
            <div className='card-header text-center text-white p-1 m-0'>
                <h5 className='card-title text-uppercase p-0 m-0'><strong>{props.hero.name}</strong></h5>
            </div>
            <div className='card-body text-center text-white m-0 p-2'>
                {viewDetails ?
                    <HeroDesc hero={props.hero} />
                    :
                    <HeroStats hero={props.hero} />
                }
            </div>
            <div className='card-footer bg-transparent border-0 text-center'>
                {viewDetails ?
                    <button className='rounded mx-auto' onClick={swapDescStat}>Stats</button>
                    :
                    <button className='rounded mx-auto p-3' onClick={swapDescStat}>Description</button>
                }
                <button className='rounded mx-auto mt-2' onClick={() => onClickAddHero(props.hero)}>Add</button>
            </div>
        </div>
    )

}


