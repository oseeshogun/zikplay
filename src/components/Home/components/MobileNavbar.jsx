import { MdMenu } from 'react-icons/md'
import styled from 'styled-components'
import Logo from '../../../assets/images/zikplay.png'

const Container = styled.div`
  display: none;

  @media (max-width: 720px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: fixed;
    top: 0;
    height: 10vh;
    z-index: 10;
    background: black;
    width: 100%;
  }
`

const LogoImage = styled.img`
  height: 40px;
`

const MobileNavbar = ({ onToggleSidenav }) => (
  <Container>
    <LogoImage src={Logo} alt="Logo Zikplay" />
    <MdMenu size={30} style={{ cursor: 'pointer' }} onClick={onToggleSidenav} />
  </Container>
)

export default MobileNavbar
