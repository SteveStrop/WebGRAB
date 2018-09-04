import { DOM } from './config'
import Photos from './models/Photos'
import Destinations from './models/Destinations'
import Download from './models/Download'
// Global state stores:
/* Photos object
|* Destinations object
|* Download object
|*
|*
*/
const state = {}
window.s = state
// EVENT HANDLERS
// page load
window.addEventListener('load', () => init(state))
// Select Button event listener
DOM.selPhotoBtn.addEventListener('click', () => DOM.hideSelPhotoBtn.click()) // dummy
DOM.hideSelPhotoBtn.addEventListener('change', async () => {
  await state.photos.loadPhotos(DOM.hideSelPhotoBtn.files)
  state.download.setReady(state.photos.renderComplete, state.destinations.currentFolder)
})
// Edit List event listener
DOM.editListBtn.addEventListener('click', () => DOM.hideEditListBtn.click()) // dummy
DOM.editListBtn.addEventListener('focus', () => state.destinations.addFolder())

// Destination radio event listener
DOM.radioPanel.addEventListener('click', () => {
  state.destinations.getCurrentFolder()
  state.download.setReady(state.photos.renderComplete, state.destinations.currentFolder)
})
// Import event listener
DOM.importBtn.addEventListener('click', () => state.download.downloadPhotos(state))
// Quit button event listener
DOM.quitBtn.addEventListener('click', () => window.close())
const init = async (state) => {
  // create data cache
  state.photos = new Photos()
  // create new Destinations object
  state.destinations = new Destinations()
  // create new Download object
  state.download = new Download()
  // get list of destination folders
  await state.destinations.getDestinations()
  state.destinations.renderFolders(state.destinations.folders)
  // get currently selected destination folder
  state.destinations.getCurrentFolder()
  state.download.setReady(state.photos.renderComplete, state.destinations.currentFolder)
}
