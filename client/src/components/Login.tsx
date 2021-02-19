import React, {useState} from 'react'

import API from './BackendAPI'

import {NavLink} from 'react-router-dom'

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')

    function handleSubmit(event: React.FormEvent){
        event.preventDefault()
        setAlert('')
        if(username.length >= 5 && password.length >= 8){
            API.post('/login', {username: username, password: password})
            .then(response => {
                if(response.data.access){
                   window.location.reload()
                }else{
                    setAlert('A megadott adatok egyike hibás!')
                }
            }).catch(err => console.log(err))
        }else{
            setAlert('Valamelyik adat túl rövid!')
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        switch(event.target.name){
            case 'username':
                setUsername(event.target.value)
                break
            case 'password':
                setPassword(event.target.value)
                break
            default:
                return
        }
    }

    return (
        <div className="glass">
            <div className="container text-center mb-3">
                <h2 className="text-info">Jelentkezzen be meglévő fiókjába!</h2>
            </div>
            {alert.length > 0 ? <div className='alert alert-danger'>{alert}</div> : null}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" name="username" value={username || ''} onChange={handleChange} autoComplete="off" required/>
                    <label htmlFor="username" className="label-name">
                        <span className="content-name">
                            E-mail
                        </span>
                    </label>
                </div>
                <div className="form-group">
                    <input type="password" name="password" value={password || ''} onChange={handleChange} autoComplete="off" required/>
                    <label htmlFor="password" className="label-name">
                        <span className="content-name">
                            Jelszó
                        </span>
                    </label>
                </div>

                <div className="container text-center">
                    <button className="btn btn-outline-info">Bejelentkezés</button>
                </div>

                <div className="container text-center mt-5">
                    <p className="text-info">
                        Még nincs fiókja? 
                        Regisztráljon <NavLink to="/register" className="text-info"><b>itt</b></NavLink>!
                    </p>
                </div>

            </form>
        </div>
    )
}