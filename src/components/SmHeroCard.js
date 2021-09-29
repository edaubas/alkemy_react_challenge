import React from 'react';
import HeroDesc from './HeroDesc';
import HeroStats from './HeroStats';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'
import { delHeroFromTeam } from '../state/action-creators/teamActions';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function SmHeroCard(props) {

    const [viewDetails, setViewDetails] = useState(false);
    const dispatch = useDispatch();

    const removeHero = (hero) => {
        //Mostramos popup para confirmar acción del usuario
        confirmAlert({
            message: `Please confirm to remove ${hero.name}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => dispatch(delHeroFromTeam(hero))
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    const swapDescStat = () => {
        viewDetails === true ? setViewDetails(false) : setViewDetails(true)
    }

    return (

        <div className='col-auto'>
            <div className='row'>
                <div className='col-shadow rounded-circle p-0'
                    style={{ width: '10rem', height: '10rem', margin: '1rem', backgroundImage: 'url(' + props.hero.image.url + ')', backgroundSize: 'cover' }}>
                    <div className='card-body rounded m-0 text-center text-white'>
                        <h3 className='card-title-shadow text-uppercase'><strong>{props.hero.name}</strong></h3>
                    </div>
                </div>
                <div className='col-auto text-white mt-3' >
                    {viewDetails ?
                        <HeroDesc hero={props.hero} />
                        :
                        <HeroStats hero={props.hero} />
                    }
                </div>
            </div>
            <div className='row justify-content-center'>
                {viewDetails ?
                    <button className='rounded mt-1 p-1 w-50' onClick={swapDescStat}>Stats</button>
                    :
                    <button className='rounded mt-1 p-1 w-50' onClick={swapDescStat}>Description</button>
                }
            </div>
            <div className='row justify-content-center'>
                <button
                    className='rounded mt-1 p-1 w-50'
                    onClick={() => removeHero(props.hero)}
                >Remove
                </button>
            </div>
        </div>

    )

}