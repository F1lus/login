import React from 'react'

import API from './BackendAPI'

export default function Login() {
    return (
        <div className="glass">
            <form>
                <div className="form-control">
                    <input type="text" name="username" autoComplete="off" required/>
                    <label htmlFor="username" className="label-name">
                        <span className="content-name">
                            Felhasználónév
                        </span>
                    </label>
                </div>
            </form>
        </div>
    )
}