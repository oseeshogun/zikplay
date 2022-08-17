import { useContext } from 'react'
import { zipPlayContext } from '../../contexts'
import styled from 'styled-components'
import defaultImage from '../../assets/svgs/Mic_drop_bro.svg'
import { RiPlayFill } from 'react-icons/ri'

const Container = styled.div`
  margin: 2rem 0;
  cursor: pointer;
`

const Artistlist = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const ArtistItem = styled.div`
  width: 14%;
  margin-right: 4%;
  border: 1px solid black;
  padding: 10px 20px;
  background: black;
  box-shadow: -1px 0px 6px 2px rgba(255,255,255,0.35);
  border-radius: 20px;
  position: relative;
  transition: all .4s ease;

  &:hover {
    transform: scale(1.05);
  }
`
const ArtistImage = styled.img`
  height: 9vw;
  width: 9vw;
  border-radius: 50%;
  object-fit: cover;
`

const Title = styled.h1`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 50px;
`

const ArtistName = styled.h4`
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
`

const ItemTitle = styled.p`
  color: grey;
  margin-top: 5px;
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
  transition: all .5s ease;

  &:hover {
    transform: scale(1.1);
    background: #72FFFF;
  }

  & > * {
    flex-shrink: 0;
  }
`

const SearchGroup = ({ title, subtitle, artists }) => {

  const { setUri } = useContext(zipPlayContext)

  const getArtistImage = (artist) => {
    try {
      if (!artist.images.length) return defaultImage;
      return artist.images[0].url
    } catch (e) {
      if ('album' in artist) {
        return getArtistImage(artist.album)
      }
    }
    return defaultImage;
  }
  
  return (
    <Container>
      <Title>{title}</Title>
      <Artistlist>
        {artists && artists.map((artist, index) => (
        <ArtistItem key={artist.uri}>
            <ArtistImage src={getArtistImage(artist)} alt={artist.name} />  
          <ArtistName>{artist.name}</ArtistName>
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