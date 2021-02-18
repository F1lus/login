import React, { useState } from 'react'

import API from './BackendAPI'

import { NavLink, Redirect } from 'react-router-dom'

export default function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [registered, setRegistered] = useState(false)
    const [alert, setAlert] = useState('')

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        if (username.length < 5 || username.length > 16) {
            setAlert('A felhasználónév hossza legalább 5, legfeljebb 16 karakter legyen!')
            return
        } else if (password.length < 8 || password.length > 16) {
            setAlert('A jelszó hossza legalább 8, legfeljebb 16 karakter legyen!')
            return
        } else if (password !== password2) {
            setAlert('A jelszavak nem egyeznek meg!')
            return
        }

        API.post('/register', { username: username, password: password })
            .then(response => {
                if (response.data.register) {
                    setRegistered(true)
                } else if (response.data.error) {
                    setAlert('A felhasználónév már foglalt!')
                }
            }).catch(err => console.log(err))

    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        switch (event.target.name) {
            case 'username':
                setUsername(event.target.value)
                break
            case 'password':
                setPassword(event.target.value)
                break
            case 'password2':
                setPassword2(event.target.value)
                break
            default:
                return
        }
    }

    return (
        <div className="glass">
            {registered ? <Redirect to='/' /> : null}
            <div className="container text-center mb-3">
                <h2 className="text-info">Készítsen új fiókot!</h2>
            </div>
            {alert ? <div className='alert alert-danger'>{alert}</div> : null}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="username" value={username || ''} onChange={handleChange} autoComplete="off" required />
                    <label htmlFor="username" className="label-name">
                        <span className="content-name">
                            Felhasználónév
                        </span>
                    </label>
                </div>
                <div className="form-group">
                    <input type="password" name="password" value={password || ''} onChange={handleChange} autoComplete="off" required />
                    <label htmlFor="password" className="label-name">
                        <span className="content-name">
                            Jelszó
                        </span>
                    </label>
                </div>
                <div className="form-group">
                    <input type="password" name="password2" value={password2 || ''} onChange={handleChange} autoComplete="off" required />
                    <label htmlFor="password" className="label-name">
                        <span className="content-name">
                            Jelszó újra
                        </span>
                    </label>
                </div>

                <div className="container text-center">
                    <button className="btn btn-outline-info">Regisztráció</button>
                </div>

                <div className="container text-center mt-5">
                    <p className="text-info">
                        Már van fiókja?
                        Jelentkezzen be <NavLink to="/" className="text-info"><b>itt</b></NavLink>!
                    </p>
                </div>
            </form>
        </div>
    )
}