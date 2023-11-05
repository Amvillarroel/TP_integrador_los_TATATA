import React, { useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login () {
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const navigate = useNavigate();

   //Enviar los datos al back para validar el usuario y la contraseña
    function handleSubmit (e) {
        e.preventDefault();
        const email = emailInput.current.value;
        const password = passwordInput.current.value;
        //envío de los datos al back para validar el email y el password y determinar si el logueo es exitoso o no
        axios.post('http://localhost:3000/login', {email, password})
        //respuesta exitosa obtenida del back sobre el email y el password enviado
        .then(async res => {
            console.log(res);
            if (res.data.token) {
                // Dentro del componente Login, después de recibir el token
                const token = res.data.token
                 // Usa await para asegurarte de que la operación de almacenamiento en localStorage se complete antes de continuar
                await new Promise(resolve => {
                localStorage.setItem('token', token);
                resolve();
                });
                
                navigate('/login');
            }}
        )
        //respuesta del back cuando hay error en credenciales
        .catch(err => console.log('Error en usuario y/o contraseña desde el front'));

        emailInput.current.value = '';
        passwordInput.current.value = '';
    }

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-30'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Ingrese su email' className='form-control' ref={emailInput}></input>
                    </div>     
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Ingrese su contraseña' className='form-control' ref={passwordInput}></input>
                    </div>
                    <button className='btn btn-success'>Login</button>
                </form>           
            </div>
        </div>
    )
}

export default Login