import { DOM } from './config'
import Photos from './models/Photos'
import * as ctrlSelect from './controllers/selectPhotos'
import * as thumb from './views/viewThumbs'
// Global state stores:
/* Photos object
|*
|*
|*
|*
*/
const state = {}

// EVENT HANDLERS
// select photos
// Select Button event listener
DOM.selectPhotosBtn.addEventListener('click', () => DOM.hiddenSelectPhotosBtn.click()) // dummy
DOM.hiddenSelectPhotosBtn.addEventListener('change', () => ctrlSelect.loadPhotos(DOM.hiddenSelectPhotosBtn.files)
)
