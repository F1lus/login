import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import API from './components/BackendAPI'
import Login from './components/Login'
import Register from './components/Register'
import './components/style/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {

  const [user, setUser] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    API.get('/login')
      .then(response => {
        setLoggedIn(response.data != null)
        if (loggedIn) {
          setUser(response.data.user)
        } else {
          setUser('')
        }
      })
  })

  return (
    <Switch>
      <Route exact path='/' component={() => {
        if (loggedIn) {
          return <Redirect to='/home' />
        } else {
          return <Login />
        }
      }} />

      <Route exact path='/home' component={() => {
        if (loggedIn) {
          return (
            <div className="glass container text-center">
              <h1>Üdvözöljük! <br/> Az Ön e-mail címe: {user}</h1>

              <hr/>
              
              <a href='http://www.nyirszikszi.hu/'>
                <button className="btn btn-outline-info m-5">NYIRSZIKSZI</button>
              </a>

              <button className="btn btn-outline-info m-5" onClick={(e) => {
                e.preventDefault()

                API.post('/logout')
                  .then(() => {
                    window.location.reload()
                  }).catch(err => console.log(err))

              }}>Kijelentkezés</button>
            </div>
          )
        } else {
          return <Redirect to='/' />
        }
      }} />

      <Route exact path='/register' component={() => {
        if (loggedIn) {
          return <Redirect to='/home' />
        } else {
          return <Register />
        }
      }} />
    </Switch>
  )
}
