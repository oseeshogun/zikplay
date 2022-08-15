import s from '../../styles/Home.module.css'

const SideBarIcon = ({ Icon, text, isActive }) => {
  return (
    <div className={`${s.sideBarIcon} ${isActive ? s.sideBarIconActive : ''}`}>
    <Icon size={25} />
      <h6 className={s.name}>{text}</h6>
    </div>
  )
}

export default SideBarIcon