import { DOM } from './config'
import Photos from './models/Photos'
import Destinations from './models/Destinations'
import Import from './models/Import'
import Status from './models/Status'
/* Global state stores:
|* Photos object
|* Destinations object
|* Download object
|* Status object
*/
const state = {}
// expose the state for testing
// window.s = state
// EVENT HANDLERS************************************************************************
// page load
window.addEventListener('load', () => init(state))
// Select Button event listener
DOM.selPhotoBtn.addEventListener('click', () => {
  state.status.showProgressBar(false)
  DOM.hideSelPhotoBtn.click() // dummy
})
DOM.hideSelPhotoBtn.addEventListener('change', async () => {
  // load photos into a cache and display thumbnails
  await state.photos.loadPhotos(state, DOM.hideSelPhotoBtn.files)
  state.import.enableImportBtn(state.photos.renderComplete, state.destinations.currentFolder) // enabled if both true
  state.status.showProgressBar(state.photos.renderComplete)
  state.status.updateStatusMessage(state)
})
// Edit List event listener
DOM.editListBtn.addEventListener('click', () => DOM.hideEditListBtn.click())
DOM.editListBtn.addEventListener('focus', () => state.destinations.addFolder())
// Destination radio event listener
DOM.radioPanel.addEventListener('click', () => {
  state.destinations.getCurrentFolder()
  state.import.enableImportBtn(state.photos.renderComplete, state.destinations.currentFolder) // enabled if both true
  state.status.updateStatusMessage(state)
})
// Import event listener
DOM.importBtn.addEventListener('click', () => state.import.import(state))
// Quit button event listener
DOM.quitBtn.addEventListener('click', () => state.import.quit())
const init = async (state) => {
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
