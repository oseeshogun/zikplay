import { useContext } from 'react'
import { NavLink } from "react-router-dom"
import { IoLibraryOutline } from 'react-icons/io5'
import { MdFavorite } from 'react-icons/md'
import { RiAccountCircleLine, RiHomeSmile2Line, RiLogoutCircleRLine } from 'react-icons/ri'
import { zipPlayContext } from '../../contexts'
import s from '../../styles/Home.module.css'
import logo from '../../assets/images/zikplay.png'
import SideBarIcon from './SideBarIcon'

const HomeLeftPart = () => {

  const { user, setToken } = useContext(zipPlayContext)

  const logOut = () => {
    setToken(null)
  }
  
  return (
    <div className={s.leftPart}> 
      <div className={s.leftTopTitle}>
        <img src={logo} alt="Logo Zikplay" />
        <h1>ZikPlay</h1>
      </div>
      <div className={s.leftAccountInfo}>
        {
          user == null || user.images.lenght == 0 ?
          <RiAccountCircleLine size={40} />
          : <img src={user.images[0].url} alt="Avatar" />
        }
        <h2>{ user == null ? '' : user.display_name }</h2>
      </div>
      <div className={s.sideBars}>
        <NavLink to='/' 
          className={s.navlink}
          children={({ isActive }) => <SideBarIcon Icon={RiHomeSmile2Line} text={'Accueil'} isActive={isActive} />}
          />

        <NavLink to='/library' 
          className={s.navlink}
          children={({ isActive }) => <SideBarIcon Icon={IoLibraryOutline} text={'Librairie'} isActive={isActive} />}
          />

         <NavLink to='/favorites' 
          className={s.navlink}
          children={({ isActive }) => <SideBarIcon Icon={MdFavorite} text={'Favoris'} isActive={isActive} />}
          />
        
      </div>
      <div className={s.expandedSpace}>
        <button className={s.logOut} onClick={logOut}>
          <RiLogoutCircleRLine size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  )
}

export default HomeLeftPart