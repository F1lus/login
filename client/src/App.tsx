import React, {useEffect, useState} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import API from './components/BackendAPI'
import Login from './components/Login'
import Register from './components/Register'
import './components/style/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {

  const [loggedIn, setLoggedIn] = useState(false) 

  useEffect(() => {

  })

  return (
    <Switch>
      <Route exact path='/' component={() => {
        if(loggedIn){
          return <Redirect to='/home' />
        }else{
          return <Login />
        }
      }} />

      <Route exact path='/home' component={() => {
        if(loggedIn){
          return <div>Hello</div>
        }else{
          return <Redirect to='/home' />
        }
      }} />
      
      <Route exact path='/register' component={Register}/>
    </Switch>
  )
}
