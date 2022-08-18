import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Welcome from './Welcome'
import Library from './Library'
import Favorites from './Favorites'

const Container = styled.div`
  height: 100%;
  width: 100%;
`

const MounteElement = ({ path, element }) => {
  const location = useLocation()

  if (location.pathname == path) return <>{element}</>

  return <></>
}

const HomeRightPart = () => {

  return (
    <Container>
      <MounteElement path="/" element={<Welcome />} />
      <MounteElement path="/library" element={<Library />} />
      <MounteElement path="/favorites" element={<Favorites />} />
    </Container>
  )
}

export default HomeRightPart
