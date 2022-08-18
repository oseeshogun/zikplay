export const getItemImage = (item) => {
  try {
    if (!item.images.length) return defaultImage
    return item.images[0].url
  } catch (e) {
    if ('album' in item) {
      return getItemImage(item.album)
    }
  }
  return defaultImage
}
