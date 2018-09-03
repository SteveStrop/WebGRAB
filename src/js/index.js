import { DOM } from './config'
import Photos from './models/Photos'
import * as ctrl from './controllers/ctrl'
import * as thumb from './views/viewThumbs'
// Global state stores:
/* Photos object
|* Destinations object
|*
|*
|*
*/
const state = {}
window.s = state
// EVENT HANDLERS
// page load
window.addEventListener('load', () => ctrl.init(state))
// select photos
// Select Button event listener
DOM.selectPhotosBtn.addEventListener('click', () => DOM.hiddenSelectPhotosBtn.click()) // dummy
DOM.hiddenSelectPhotosBtn.addEventListener('change', () => ctrl.loadPhotos(DOM.hiddenSelectPhotosBtn.files, state)
)
