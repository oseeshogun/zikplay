import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Callback.module.css'
import logo from '../assets/images/zikplay.png'
import micDrop from '../assets/svgs/Mic_drop_bro.svg'

const Callback = ({ setToken }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const hash = window.location.hash

    if (hash) {
      const spotifyToken = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1]

      window.location.hash = ''
      setToken(spotifyToken)

      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [])

  return (
    <div className={styles.container}>
      <div>
        <img src={logo} alt="ZikPlay Logo" className={styles.logo} />
        <h1 className={styles.title}>
          Bientôt, vous allez être connecté aux meilleurs de la Musique
        </h1>
        <p className={styles.patient}>Veiullez patientez...</p>
      </div>
      <img src={micDrop} alt="Mic drop" className={styles.svg} />
    </div>
  )
}

export default Callback
