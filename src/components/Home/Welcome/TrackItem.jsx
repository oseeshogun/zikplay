import styled from 'styled-components'
import TextTruncate from 'react-text-truncate'
import Spinner from 'react-spinner-material'
import { getItemImage } from '../../../utils/getItemImage'
import { RiPlayFill } from 'react-icons/ri'
import { useContext } from 'react'
import { zipPlayContext } from '../../../contexts'
import { useState } from 'react'
import DisplayElement from '../../Utils/DisplayElement'

const Container = styled.div`
  background: black;
  width: 100%;
  padding: 10px;
  padding-bottom: 15px;
  border-radius: ${props => props.isArtiste ? '15px': '5px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  & .icon-container {
    opacity: 0;
  }

  &:hover {
    transform: scale(1.05);
  }

  &:hover .icon-container {
    opacity: 1;
  }

  &:hover .icon-container:hover {
    transform: scale(1.1)
  }
`

const Image = styled.img`
  height: 10rem;
  width: 10rem;
  border-radius: ${props => props.isArtiste ? '50%' : '5px'};
  margin-bottom: 15px;
  object-fit: cover;
`

const TypeText = styled.p`
  margin: 5px 0;
  color: grey;
`

const PlayerIconContainer = styled.div`
  padding: 5px;
  background: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  position: absolute;
  bottom: 10px;
  right: 10px;

  & > * {
    flex-grow: 1;
  }
`

export const TracksContainer = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, 186px);
  padding: 10px 0;
`

const TrackItem = ({ track, type, isArtiste }) => {
  const { setUri } = useContext(zipPlayContext)

  const [loading, setLoading] = useState(false)

  const { name } = track

  const image = getItemImage(track)

  const onTrackClick = () => {
    setUri(track.uri)
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Container onClick={onTrackClick} isArtiste={isArtiste}>
      <Image src={image} alt={name} isArtiste={isArtiste ?? false} />
      <h3>
        <TextTruncate line={2} text={name} />
      </h3>
      <TypeText>{type}</TypeText>
      <PlayerIconContainer className="icon-container">
        <DisplayElement display={!loading}>
          <RiPlayFill color="#333" size={30} />
        </DisplayElement>
        <DisplayElement display={loading}>
          <Spinner radius={30} color={'#333'} stroke={2} visible={true} />
        </DisplayElement>
      </PlayerIconContainer>
    </Container>
  )
}

export default TrackItem
