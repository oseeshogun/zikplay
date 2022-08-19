import styled from 'styled-components'
import DisplayElement from '../../Utils/DisplayElement'
import { ClimbingBoxLoader } from 'react-spinners'

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadingItems = ({ display }) => {
  return (
    <LoaderWrapper>
      <DisplayElement display={display}>
        <ClimbingBoxLoader color="#fff" />
      </DisplayElement>
    </LoaderWrapper>
  )
}

export default LoadingItems
