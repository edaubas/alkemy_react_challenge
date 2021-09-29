import React from 'react';
import SmHeroCard from './SmHeroCard';
import { useSelector } from 'react-redux';

export default function Team() {

    const team = useSelector(state => state.team);
    let sortStats = Object.keys(team.stats).sort(function (a, b) { return team.stats[b] - team.stats[a] });

    return (

        (team.good.length > 0 || team.bad.length > 0) ?

            <div className='container-fluid mt-4 bg-dark bg-gradient '>
                <div className='row text-center text-white'>
                    <div className='bg-dark pt-2 pb-2'>
                        <h3><strong>Power Stat</strong></h3>
                        <strong>{sortStats[0].charAt(0).toUpperCase() + sortStats[0].slice(1)}: {team.stats[sortStats[0]]}</strong>
                    </div>
                    <p className='mt-3 mb-1'>
                        <strong>Other stats:</strong>
                        {
                            sortStats.map((stat, i) => {
                                return (
                                    i > 0 && ` ${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${team.stats[stat]} /`
                                )
                            }
                            )
                        }
                    </p>
                    <p>Avg Weight: {Math.round(team.weight / (team.good.length + team.bad.length))} kg
                        - Avg Height: {Math.round(team.height / (team.good.length + team.bad.length))} cm</p>
                </div>

                <div className='row justify-content-center text-white p-3'>
                    <div className='col-md-8'>
                        <div className='row heroGood bg-gradient justify-content-center rounded pb-3'>
                            {team.good.map(hero => <SmHeroCard hero={hero} />)}
                        </div>
                        <div className='row heroBad bg-gradient justify-content-center rounded pb-3 mt-1'>
                            {team.bad.map(hero => <SmHeroCard hero={hero} />)}
                        </div>
                    </div>
                </div>
            </div >
            :
            <h1 className='mt-5'>Your team is empty!</h1>
    )

}
