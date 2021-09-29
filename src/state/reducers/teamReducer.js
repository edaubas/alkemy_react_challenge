import { ADD_HERO_TO_TEAM, DEL_HERO_FROM_TEAM, SET_RESULTS_HERO_API } from '../constants';

let stats = {};
let weight = 0;
let height = 0;
let newResults = [];

const getNumber = (string) => { return string === "null" ? 0 : parseInt(string.replace(/[^0-9]/g, ''), 0) };

const teamReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_HERO_TO_TEAM:

            stats = state.stats;
            weight = state.weight;
            height = state.height;
            newResults = state.searchResults;

            //  Recalcular stats del equipo
            stats.combat += getNumber(action.payload.powerstats.combat);
            stats.durability += getNumber(action.payload.powerstats.durability);
            stats.intelligence += getNumber(action.payload.powerstats.intelligence);
            stats.power += getNumber(action.payload.powerstats.power);
            stats.speed += getNumber(action.payload.powerstats.speed);
            stats.strength += getNumber(action.payload.powerstats.strength);
            weight += getNumber(action.payload.appearance.weight[1]);
            height += getNumber(action.payload.appearance.height[1]);

            if (action.payload.biography.alignment === 'good') {

                //Equipo completo?
                if (state.good.length >= 3) {
                    return {
                        ...state, error: 'Good team is full!'
                    }

                } else {

                    //Actualizar estado con nuevo heroe
                    return {
                        ...state,
                        good: [...state.good, action.payload],
                        stats: stats,
                        weight: weight,
                        height: height,
                        error: ' ',
                        searchResults: newResults.filter(h => h.id !== action.payload.id),
                    }
                }
            }
            else {

                //Equipo completo?
                if (state.bad.length >= 3) {
                    return {
                        ...state, error: 'Bad team is full!'
                    }

                } else {

                    //Actualizar estado con nuevo heroe
                    return {
                        ...state,
                        bad: [...state.bad, action.payload],
                        stats: stats,
                        weight: weight,
                        height: height,
                        error: ' ',
                        searchResults: newResults.filter(h => h.id !== action.payload.id),
                    }
                }
            }

        case DEL_HERO_FROM_TEAM:

            stats = state.stats;
            weight = state.weight;
            height = state.height;

            //  Recalcular stats del equipo
            stats.combat -= getNumber(action.payload.powerstats.combat);
            stats.durability -= getNumber(action.payload.powerstats.durability);
            stats.intelligence -= getNumber(action.payload.powerstats.intelligence);
            stats.power -= getNumber(action.payload.powerstats.power);
            stats.speed -= getNumber(action.payload.powerstats.speed);
            stats.strength -= getNumber(action.payload.powerstats.strength);
            weight -= getNumber(action.payload.appearance.weight[1]);
            height -= getNumber(action.payload.appearance.height[1]);

            if (action.payload.biography.alignment === 'good') {

                return {
                    ...state,
                    good: state.good.filter(h => h.id !== action.payload.id),
                    stats: stats,
                    weight: weight,
                    height: height,
                    error: ''
                }

            } else {

                return {
                    ...state,
                    bad: state.bad.filter(h => h.id !== action.payload.id),
                    stats: stats,
                    weight: weight,
                    height: height,
                    error: ''
                }

            }
        case SET_RESULTS_HERO_API:

            //Si los equipos estan vacios, asignamos el array completo
            if (state.good.length === 0 && state.bad.length === 0) {

                return {
                    ...state, searchResults: action.payload
                }

            } else {

                //Borramos del array de la respuesta los heroes que ya fueron agregados previamente
                for (let i = 0; i < action.payload.length; i++) {
                    if (state.good.findIndex(g => g.id === action.payload[i].id) < 0 && state.bad.findIndex(b => b.id === action.payload[i].id) < 0) {
                        newResults.push(action.payload[i]);
                    }
                }

                if (newResults.length === 0) {

                    return {
                        ...state, searchResults: []
                    }

                } else {

                    return {
                        ...state, searchResults: newResults
                    }
                }
            }

        default:
            return state;
    }
}

export default teamReducer;