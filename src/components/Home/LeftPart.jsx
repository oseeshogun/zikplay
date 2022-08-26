import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { IoLibraryOutline } from 'react-icons/io5'
import { MdClose, MdFavorite } from 'react-icons/md'
import {
  RiAccountCircleLine,
  RiHomeSmile2Line,
  RiLogoutCircleRLine,
} from 'react-icons/ri'
import { zikPlayContext } from '../../contexts'
import styles from '../../styles/Home.module.css'
import logo from '../../assets/images/zikplay.png'
import SideBarIcon from './components/SideBarIcon'
import DisplayElement from '../Utils/DisplayElement'

const Container = styled.div`
  background: black;
  padding: 20px 0;
  transition: all 0.4s ease;

  @media (max-width: 720px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    height: 100%;
    width: 100%;
    transform: translateX(${(props) => (props.active ? '0' : '-100%')});
  }
`

const CloseIcon = styled(MdClose)`
  position: fixed;
  top: 10px;
  right: 15px;
  display: none;

  @media (max-width: 720px) {
    display: unset;
    cursor: pointer;
  }
`

const LeftPart = ({ showMobileNav, showSidenav }) => {
  const { user, setToken } = useContext(zikPlayContext)

  const logOut = () => {
    setToken(null)
  }

  return (
    <Container active={showMobileNav}>
      <CloseIcon size={30} onClick={() => showSidenav(false)} />
      <div className={styles.leftTopTitle}>
        <img src={logo} alt="Logo Zikplay" />
        <h1>ZikPlay</h1>
      </div>
      <div className={styles.leftAccountInfo}>
        <DisplayElement
          display={!user || !user.images || user.images.length == 0}
        >
          <RiAccountCircleLine size={40} />
        </DisplayElement>
        <DisplayElement
          display={user && user.images && user.images.length >= 0}
        >
          <img src={user.images[0].url} alt="Avatar" />
        </DisplayElement>

        <h2>{user == null ? '' : user.display_name}</h2>
      </div>
      <div className={styles.sideBars}>
        <NavLink
          to="/"
          className={styles.navlink}
          onClick={() => showSidenav(false)}
        >
          {({ isActive }) => (
            <SideBarIcon
              Icon={RiHomeSmile2Line}
              text={'Accueil'}
              isActive={isActive}
            />
          )}
        </NavLink>

        <NavLink
          to="/library"
          className={styles.navlink}
          onClick={() => showSidenav(false)}
        >
          {({ isActive }) => (
            <SideBarIcon
              Icon={IoLibraryOutline}
              text={'Librairie'}
              isActive={isActive}
            />
          )}
        </NavLink>

        <NavLink
          to="/favorites"
          className={styles.navlink}
          onClick={() => showSidenav(false)}
        >
          {({ isActive }) => (
            <SideBarIcon
              Icon={MdFavorite}
              text={'Favoris'}
              isActive={isActive}
            />
          )}
        </NavLink>
      </div>
      <div className={styles.expandedSpace}>
        <button className={styles.logOut} onClick={logOut}>
          <RiLogoutCircleRLine size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </Container>
  )
}

export default LeftPart
