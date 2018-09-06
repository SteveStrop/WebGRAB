import { DOM } from '../js/config'
import Photos from '../js/models/Photos'
import Destinations from '../js/models/Destinations'
import Import from '../js/models/Import'
import Status from '../js/models/Status'
export const selectBtn = (state) => {
  state.import.importComplete = false
  state.status.updateStatusMessage(state)
  state.photos.clearThumbs()
  state.status.showProgressBar(false)
  DOM.hideSelPhotoBtn.click()
}

export const hideSelBtn = async (state) => {
  // load photos into a cache and display thumbnails
  await state.photos.loadPhotos(state, DOM.hideSelPhotoBtn.files)
  state.import.enableImportBtn(state.photos.renderComplete, state.destinations.currentFolder) // enabled if both true
  state.status.showProgressBar(state.photos.renderComplete)
  state.status.updateStatusMessage(state)
}

export const radioPanel = (state) => {
  state.status.showProgressBar(false)
  state.destinations.getCurrentFolder()
  state.import.enableImportBtn(state.photos.renderComplete, state.destinations.currentFolder) // enabled if both true
  state.status.updateStatusMessage(state)
}

export const init = async (state) => {
  // create photo cache
  state.photos = new Photos()
  // get and display local destination folders/radio buttons
  state.destinations = new Destinations()
  // rename and import photos to local destination folders
  state.import = new Import()
  // create progress bar and status messages
  state.status = new Status()
  // get list of destination folders
  await state.destinations.getDestinations()
  state.destinations.renderFolders(state.destinations.folders)
  // get currently selected destination folder
  state.destinations.getCurrentFolder()
  state.import.enableImportBtn(state.photos.renderComplete, state.destinations.currentFolder)
  // set initial display message
  state.status.updateStatusMessage(state)
}
