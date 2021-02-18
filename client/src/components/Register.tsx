import React from 'react'

import API from './BackendAPI'

import {NavLink} from 'react-router-dom'

export default function Register() {
    return (
        <div className="glass">
            <div className="container text-center mb-3">
                <h2 className="text-info">Készítsen új fiókot!</h2>
            </div>
            <form>
                <div className="form-group">
                    <input type="text" name="username" autoComplete="off" required/>
                    <label htmlFor="username" className="label-name">
                        <span className="content-name">
                            Felhasználónév
                        </span>
                    </label>
                </div>
                <div className="form-group">
                    <input type="text" name="username" autoComplete="off" required/>
                    <label htmlFor="username" className="label-name">
                        <span className="content-name">
                            Felhasználónév újra
                        </span>
                    </label>
                </div>
                <div className="form-group">
                    <input type="password" name="password" autoComplete="off" required/>
                    <label htmlFor="password" className="label-name">
                        <span className="content-name">
                            Jelszó
                        </span>
                    </label>
                </div>
                <div className="form-group">
                    <input type="password" name="password" autoComplete="off" required/>
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