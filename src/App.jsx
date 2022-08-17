import React, { useEffect, useReducer } from 'react'
import './App.css'
import Spotify from 'spotify-web-api-js'
import { useLocalStorage } from './hooks'
import PreLoader from './PreLoader'
const Home = React.lazy(() => import("./components/Home"))
const Login = React.lazy(() => import("./components/Login"))
import Callback from "./components/Callback"
import { zipPlayContext } from "./contexts"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import { reducer, initialZikState } from './reducer'

const spotify = new Spotify();

export default function App() {
  const [token, setToken] = useLocalStorage("token", null)
  const [uri, setUri] = useLocalStorage('uri', null)
  const [{ user }, dispatch] = useReducer(reducer, initialZikState)

  useEffect(() => {
    if (token) {
      spotify.setAccessToken(token);

      
      spotify.getMe().then(user => {
        console.log(user)
        dispatch({
          type: 'SET_USER',
          user: user,
        })
      }).catch(err => {
        console.log("Erreur ", err);
        if (err.status === 401) {
          setToken(null)
        }
      })
    }
  }, [token])

  return (
    <zipPlayContext.Provider value={{ token, setToken, user, spotify, uri, setUri }}>
      <BrowserRouter>
        <Routes>
          {
            ['/', '/library', '/favorites'].map((path) => <Route path={path} key={path} element={
            token ? (<React.Suspense fallback={<PreLoader />}>
                <Home />
            </React.Suspense>) 
              
              : <Navigate to="/login" replace />
          } />)
          }
          <Route path="/login" element={!token ? (
              <React.Suspense fallback={<PreLoader />}>
                <Login />
              </React.Suspense>
          ) : <Navigate to="/" replace />} />
          <Route path="/callback/" element={<Callback setToken={setToken} />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </zipPlayContext.Provider>
  )
}
