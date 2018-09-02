import Photos from '../models/Photos'

export async function selectPhotos (photosArray) {
  // create the data object
  const photos = new Photos()
  // for each photo
  for (const photo of photosArray) {
    // 1. get the photo
    if (!photo.type.includes('image')) continue
    const thumb = await photos.getPhoto(photo)
    // 2. render in thumbnails pane
    console.log(thumb)
  }
}
