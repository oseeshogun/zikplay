import { useContext } from 'react'
import { zipPlayContext } from '../../contexts'
import styled from 'styled-components'
import defaultImage from '../../assets/svgs/Mic_drop_bro.svg'
import { RiPlayFill } from 'react-icons/ri'
import { ClimbingBoxLoader } from 'react-spinners'
import TextTruncate from 'react-text-truncate'

const Container = styled.div`
  margin: 2rem 0;
  cursor: pointer;
`

const Artistlist = styled.div`
  width: 100%;
  display: flex;
`

const Spacer = styled.div`
  flex-grow: 1;
  min-height: 1rem;
`

const ArtistItem = styled.div`
  width: 16%;
  margin-right: 4%;
  min-height: fit-content;
  border: 1px solid black;
  padding: 10px 5px;
  background: black;
  box-shadow: -1px 0px 6px 2px rgba(255, 255, 255, 0.35);
  border-radius: 10px;
  position: relative;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: scale(1.05);
  }
`
const ArtistImage = styled.img`
  height: 9vw;
  width: 9vw;
  border-radius: ${(props) => (props.circle ? '50%' : '10px')};
  object-fit: cover;
`

const Title = styled.h1`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 30px;
`

const ArtistName = styled.h4`
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
  width: 100%;
  text-align: left;
`

const ItemTitle = styled.p`
  color: grey;
  margin-top: 5px;
  width: 100%;
  text-align: left;
`

const IconContainer = styled.div`
  background: white;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  padding: 15px;
  position: absolute;
  right: 5px;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);
    background: #72ffff;
  }

  & > * {
    flex-shrink: 0;
  }
`

const LoaderContainer = styled.div`
  width: 60vw;
  display: flex;
  justify-content: center;
`

const SearchGroup = ({ title, subtitle, artists }) => {
  const { setUri } = useContext(zipPlayContext)

  const circle = subtitle === 'Artiste'

  const getArtistImage = (artist) => {
    try {
      if (!artist.images.length) return defaultImage
      return artist.images[0].url
    } catch (e) {
      if ('album' in artist) {
        return getArtistImage(artist.album)
      }
    }
    return defaultImage
  }

  return (
    <Container>
      <Title>{title}</Title>
      {artists.length === 0 && (
        <LoaderContainer>
          <ClimbingBoxLoader color="#fff" />
        </LoaderContainer>
      )}
      <Artistlist>
        {artists &&
          artists.map((artist, index) => (
            <ArtistItem key={artist.uri}>
              <ArtistImage
                src={getArtistImage(artist)}
                circle={circle}
                alt={artist.name}
              />
              <Spacer />
              <ArtistName>
                <TextTruncate text={artist.name} truncateText="…" line={3} />
              </ArtistName>
              <ItemTitle>{subtitle}</ItemTitle>
              <IconContainer onClick={() => setUri(artist.uri)}>
                <RiPlayFill color="#000" size="1.5rem" />
              </IconContainer>
            </ArtistItem>
          ))}
      </Artistlist>
    </Container>
  )
}

export default SearchGroup
