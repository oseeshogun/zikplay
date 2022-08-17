import { useContext } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import styled from 'styled-components'
import { zipPlayContext } from '../../contexts'
import s from '../../styles/Home.module.css'
import HomeLeftPart from './HomeLeftPart'
import HomeRightPart from './HomeRightPart'

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  color: white !important;
`

const Home = () => {

  const { token, uri } = useContext(zipPlayContext)
  
  return (
    <div className={s.container}>
      <HomeLeftPart />
      <HomeRightPart />
      {
        uri && (
          <PlayerContainer>
            <SpotifyPlayer
              token={token}
              uris={[uri]}
              styles={{
                activeColor: '#fff',
                bgColor: '#333',
                color: '#fff',
                loaderColor: '#fff',
                sliderColor: '#1cb954',
                trackArtistColor: '#ccc',
                trackNameColor: '#fff',
                color: '#fff'
              }}
            />
          </PlayerContainer>
        )
      }
    </div>
  )
}

export default Home