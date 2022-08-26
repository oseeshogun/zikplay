import styles from '../../../styles/Home.module.css'

const SideBarIcon = ({ Icon, text, isActive }) => {
  return (
    <div className={`${styles.sideBarIcon} ${isActive ? styles.sideBarIconActive : ''}`}>
      <Icon size={25} />
      <h6 className={styles.name}>{text}</h6>
    </div>
  )
}

export default SideBarIcon

