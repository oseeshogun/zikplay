import { useCallback, useContext, useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import styled from 'styled-components'
import { zikPlayContext } from '../../contexts'
import s from '../../styles/Home.module.css'
import HomeLeftPart from './HomeLeftPart'
import HomeRightPart from './HomeRightPart'

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  color: white !important;
`

const webPlayerStyle = {
  activeColor: '#fff',
  bgColor: '#333',
  loaderColor: '#fff',
  sliderColor: '#1cb954',
  trackArtistColor: '#ccc',
  trackNameColor: '#fff',
  color: '#fff',
}

const Home = () => {
  const { token, uri, play, setPlay } = useContext(zikPlayContext)

  useEffect(() => {
    setPlay(true)
  }, [uri])

  const onKeyPress = useCallback(
    (event) => {
      if (event.keyCode === 32) {
        setPlay(!play)
      }
    },
    [play, setPlay]
  )

  useEffect(() => {
    document.addEventListener('keypress', onKeyPress)
    return () => {
      document.removeEventListener('keypress', onKeyPress)
    }
  })

  return (
    <div className={s.container}>
      <HomeLeftPart />
      <HomeRightPart />
      {uri && (
        <PlayerContainer>
          <SpotifyPlayer
            autoPlay={true}
            play={play}
            callback={({ isPlaying }) => {
              setPlay(isPlaying)
            }}
            token={token}
            uris={Array.isArray(uri) ? uri : [uri]}
            styles={webPlayerStyle}
          />
        </PlayerContainer>
      )}
    </div>
  )
}

export default Home
