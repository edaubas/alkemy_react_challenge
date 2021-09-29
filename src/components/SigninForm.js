import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup'
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { signInSubmit } from '../state/action-creators/formsActions'

export default function SigninForm() {

  const dispatch = useDispatch()

  const [signInError, setSignInError] = useState('');

  const onSignInSubmit = (values, actions) => {
    //Redirigimos llamada desde backend para evitar errores de seguridad(CORS)
    //ver archivo ->setupProxy.js

    axios.post('/api/user', {
      email: values.email,
      password: values.password
    })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          dispatch(signInSubmit(res.data.token))
        }
      })
      .catch(error => {
        error.response !== undefined ?
          setSignInError(error.response.data.error)
          :
          setSignInError(error.message)
        actions.setSubmitting(false);
      }
      )

  }

  // Validar input de usuario
  const validationSchema = yup.object().shape({
    email: yup.string().email('Correo incorrecto').required('Obligatorio'),
    password: yup.string().required('Obligatorio')
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);
      onSignInSubmit(values, actions);
    },
    validationSchema,
  });

  return (
    <Container className='mt-3 text-center' fluid style={{ maxWidth: '25rem' }}>
      <h1 className='d-flex justify-content-center'>Please sign in</h1>
      <form onSubmit={formik.handleSubmit}>

        <FormGroup className='mb-3' controlId='email'>
          <FormLabel>Email</FormLabel>
          <FormControl
            type={'text'}
            size='sm'
            placeholder='user@mail.com'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email} />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </FormGroup>

        <FormGroup className='mb-3' controlId='password'>
          <FormLabel>Contraseña</FormLabel>
          <FormControl
            type={'password'}
            size='sm'
            placeholder='* * * * * * * * *'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password} />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </FormGroup>

        <Button variant='primary' type='submit'>
          {formik.isSubmitting ?
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            : 'Submit'}
        </Button>

        {signInError && <div>{signInError}</div>}

      </form>
    </Container>
  )
}