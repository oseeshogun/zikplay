import { useCallback, useContext, useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import styled from 'styled-components'
import { zikPlayContext } from '../../contexts'
import styles from '../../styles/Home.module.css'
import HomeLeftPart from './LeftPart'
import RightPart from './RightPart'
import MobileNavbar from './components/MobileNavbar'

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

  const [showMobileNav, setShowMobileNav] = useState(false)

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

  const onToggleSidenav = () => {
    setShowMobileNav(!showMobileNav)
  }

  return (
    <div className={styles.container}>
      <MobileNavbar onToggleSidenav={onToggleSidenav} />
      <HomeLeftPart
        showMobileNav={showMobileNav}
        onToggleSidenav={onToggleSidenav}
      />
      <RightPart />
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
