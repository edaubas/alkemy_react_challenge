import { ADD_HERO_TO_TEAM, DEL_HERO_FROM_TEAM, SET_RESULTS_HERO_API } from '../constants';

export const addHeroToTeam = (hero) => {
    return (dispatch) => {
        dispatch({
            type: ADD_HERO_TO_TEAM,
            payload: hero
        })
    }
}

export const delHeroFromTeam = (hero) => {
    return (dispatch) => {
        dispatch({
            type: DEL_HERO_FROM_TEAM,
            payload: hero
        })
    }
}

export const setResults = (searchResults) => {
    return (dispatch) => {
        dispatch({
            type: SET_RESULTS_HERO_API,
            payload: searchResults
        })
    }
}