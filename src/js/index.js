import { DOM } from './config'
import Photos from './models/Photos'
import Destinations from './models/Destinations'
import Download from './models/Download'
import Status from './models/Status'
// Global state stores:
/* Photos object
|* Destinations object
|* Download object
|* Status object
|*
*/
const state = {}
window.s = state
// EVENT HANDLERS
// page load
window.addEventListener('load', () => init(state))
// Select Button event listener
DOM.selPhotoBtn.addEventListener('click', () => {
  state.status.showProgressBar(false)
  DOM.hideSelPhotoBtn.click() // dummy
})
DOM.hideSelPhotoBtn.addEventListener('change', async () => {
  await state.photos.loadPhotos(state, DOM.hideSelPhotoBtn.files)
  state.download.setReady(state.photos.renderComplete, state.destinations.currentFolder)
  state.status.showProgressBar(state.photos.renderComplete)
  state.status.updateStatus(state)
})
// Edit List event listener
DOM.editListBtn.addEventListener('click', () => { DOM.hideEditListBtn.click() })
DOM.editListBtn.addEventListener('focus', () => { state.destinations.addFolder() })

// Destination radio event listener
DOM.radioPanel.addEventListener('click', () => {
  state.destinations.getCurrentFolder()
  state.download.setReady(state.photos.renderComplete, state.destinations.currentFolder)
  state.status.updateStatus(state)
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
  // create new Status object
  state.status = new Status()
  // get list of destination folders
  await state.destinations.getDestinations()
  state.destinations.renderFolders(state.destinations.folders)
  // get currently selected destination folder
  state.destinations.getCurrentFolder()
  state.download.setReady(state.photos.renderComplete, state.destinations.currentFolder)
  // set initial display message
  state.status.updateStatus(state)
}
