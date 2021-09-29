import React, { useState, useMemo } from 'react';
import axios from 'axios';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import debounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux';
import { setResults } from '../state/action-creators/teamActions';
import HeroCard from './HeroCard';


export default function AddHeroForm() {

    const [apiResMess, setApiResMess] = useState('');
    const results = useSelector(state => state.team.searchResults);
    const dispatch = useDispatch();

    const getHeroes = (event) => {
        if (event.target.value) {
            setApiResMess('Searching . . .');
            //Redirigimos llamada desde backend para evitar errores de seguridad(CORS)
            //ver archivo ->setupProxy.js
            axios.get(`/api/hero/${process.env.REACT_APP_SUPERHERO_API_TOKEN}/search/${event.target.value}`)
                .then((res) => {
                    if (res.data.error) {
                        dispatch(setResults([]))
                        setApiResMess(res.data.error);
                    } else {
                        setApiResMess('');
                        dispatch(setResults(res.data.results));
                    }
                })
                .catch(error => {
                    setApiResMess(error.message);
                    dispatch(setResults([]));
                    console.log(error.message);
                }
                )
        } else {
            apiResMess !== '' && setApiResMess('')
            results !== [] && dispatch(setResults([]));
        }

    }

    const debouncedChangeHandler = useMemo(
        () => debounce(getHeroes, 1000), [])

    return (

        <div className='container-fluid row justify-content-center'>
            <FormGroup className='mb-3 text-center' style={{ maxWidth: '300px' }}>
                <FormLabel>Search your heroes by name</FormLabel>
                <FormControl
                    type={'name'}
                    size='sm'
                    placeholder='Iron Man'
                    onChange={debouncedChangeHandler} />
                {apiResMess}
            </FormGroup>
            <div className='container-fluid row justify-content-center'>
                {results.map(hero => <HeroCard hero={hero} />)}
            </div>
        </div>
    )
}
