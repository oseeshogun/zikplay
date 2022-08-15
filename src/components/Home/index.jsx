import { useContext } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { zipPlayContext } from '../../contexts'
import s from '../../styles/Home.module.css'
import HomeLeftPart from './HomeLeftPart'
import HomeRightPart from './HomeRightPart'

const Home = () => {

  const { token } = useContext(zipPlayContext)
  
  return (
    <div className={s.container}>
      <HomeLeftPart />
      <HomeRightPart />
    </div>
  )
}

export default Home