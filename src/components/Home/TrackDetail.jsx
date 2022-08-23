import { useContext, useState } from 'react'
import TextTruncate from 'react-text-truncate'
import styled from 'styled-components'
import moment from 'moment'
import DisplayElement from '../Utils/DisplayElement.jsx'
import { zikPlayContext } from '../../contexts.jsx'
import { getItemImage } from '../../utils/getItemImage.js'
import SoundGif from '../../assets/images/sound.gif'
import { RiPlayFill } from 'react-icons/ri'
import Spinner from 'react-spinner-material'

const TrackDetaiContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 5px 10px;
  margin: 10px 5px;

  & .play__icon {
    opacity: 0;
  }

  &:hover {
    cursor: pointer;
    background: rgba(125, 125, 125, 0.2);

    & .play__icon {
      opacity: 1;
    }
  }

  & > *:first-child {
    width: 50%;
  }

  & > *:nth-child(2) {
    width: 30%;
  }

  & > *:nth-child(3) {
    width: 20%;
    padding-left: 10px;
  }
`

const TrackTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: bold;

  & * {
    margin: 0 5px;
  }

  & > *:first-child {
    width: 10%;
  }

  & > *:nth-child(2) {
    width: 50px;
  }

  & > *:nth-child(3) {
    width: 70%;
    text-align: left;
  }
`

const TrackImage = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 5px;
`

const TrackDuration = styled.h4`
  color: grey;
`

const PlayIconContainer = styled.div`
  width: 40px;
  height: 40px;
  background: white;
  position: absolute;
  right: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s ease;
`

const SoundImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin: 5px;
  border-radius: 10px;
`
const TrackDetail = ({ data, count }) => {
  const { uri, setUri, play } = useContext(zikPlayContext)

  const [loading, setLoading] = useState(false)

  const { added_at, track } = data

  const image = getItemImage(track.album)

  const duration = moment.utc(track.duration_ms).format('mm:ss')

  const onTrackClick = () => {
    setUri(track.uri)
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <TrackDetaiContainer onClick={onTrackClick}>
      <TrackTitle>
        <span>{count}</span>
        <TrackImage src={image} alt={track.name} />
        <h4 title={track.name}>
          <TextTruncate line={2} element="h4" text={track.name} />
        </h4>
      </TrackTitle>
      <div title={track.album.name}>
        <TextTruncate line={2} element="h4" text={track.album.name} />
      </div>
      <TrackDuration>{duration}</TrackDuration>
      <PlayIconContainer className="play__icon">
        <DisplayElement display={!loading && (uri !== track.uri || !play)}>
          <RiPlayFill color="#333" size={30} />
        </DisplayElement>
        <DisplayElement display={loading}>
          <Spinner radius={30} color={'#333'} stroke={2} visible={true} />
        </DisplayElement>
        <DisplayElement display={uri === track.uri && !loading && play}>
          <SoundImage src={SoundGif} alt="Soung" />
        </DisplayElement>
      </PlayIconContainer>
    </TrackDetaiContainer>
  )
}

export default TrackDetail
