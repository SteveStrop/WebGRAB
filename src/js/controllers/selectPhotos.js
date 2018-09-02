import Photos from '../models/Photos'

export async function loadPhotos (fileList) {
  console.log(`photosArray entering async function loadPhotos is ${fileList}`)
  try { // get photos
    const photos = await getPhotos(fileList)
    console.log(photos)
    return photos
  } catch (error) { console.log(error) }
}

const getPhotos = async (arr) => { // create the data object
  const photos = new Photos()
  // process the photos
  for (const photo of arr) {
    // 1. get the photo
    if (!photo.type.includes('image')) continue
    try {
      await photos.getPhoto(photo)
    } catch (error) {
      window.alert('Error downloading photos. See console for more information')
      console.log(error)
    }
  }
  console.log(`getPhotos return value is: ${photos}`)
  return photos
}
