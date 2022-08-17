import { ClimbingBoxLoader } from 'react-spinners'
import styled from 'styled-components'

const PreloaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
`

const PreLoader = () => {
  return <PreloaderContainer>
    <ClimbingBoxLoader color="#fff" />
  </PreloaderContainer>
}

export default PreLoader