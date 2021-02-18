import React from 'react'

import API from './BackendAPI'

export default function Login() {
    return (
        <div className="glass">
            <div className="container text-center mb-3">
                <h2 className="text-info">Jelentkezzen be meglévő fiókjába!</h2>
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
                    <input type="password" name="password" autoComplete="off" required/>
                    <label htmlFor="password" className="label-name">
                        <span className="content-name">
                            Jelszó
                        </span>
                    </label>
                </div>

                <div className="container text-center">
                    <button className="btn btn-outline-info">Bejelentkezés</button>
                </div>

                <div className="container text-center">
                    
                </div>

            </form>
        </div>
    )
}