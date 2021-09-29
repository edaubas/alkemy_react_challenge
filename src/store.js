import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import teamReducer from "./state/reducers/teamReducer";
import formsReducer from "./state/reducers/formsReducer";

const iniState = {
    team: {
        good: [],
        bad: [],
        stats: {
            combat: 0,
            durability: 0,
            intelligence: 0,
            power: 0,
            speed: 0,
            strength: 0,
        },
        weight: 0,
        height: 0,
        error:'',
        searchResults: []
    },
    forms: {
        isSignedIn: false,
    }
}

const store = createStore(
    combineReducers({
        team: teamReducer,
        forms: formsReducer
    }),
    iniState,
    applyMiddleware(thunk)
)
export default store;