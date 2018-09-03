import Photos from '../models/Photos'
import Destinations from '../models/Destinations'
import * as thumbs from '../views/viewThumbs'

export const init = async (state) => {
  // create data cache
  state.photos = new Photos()
  // create new Destinations object
  state.destinations = new Destinations()
  // get list of destination folders
  await state.destinations.getDestinations()
  state.destinations.render(state.destinations.folders)
}
export const loadPhotos = async (fileList, state) => {
  // clear display
  thumbs.clearThumb()
  // process the photos
  for (const file of fileList) {
    if (!file.type.includes('image')) continue
    try {
      // 1. get  photo
      const photo = await state.photos.getPhoto(file)
      // 2. render photo
      thumbs.renderThumb(photo)
    } catch (error) { console.log(error) }
  }
}
