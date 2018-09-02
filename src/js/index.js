import { DOM } from './config'
import Photos from './models/Photos'
import * as select from './controllers/selectPhotos'
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
DOM.hiddenSelectPhotosBtn.addEventListener('change', () => select.selectPhotos(DOM.hiddenSelectPhotosBtn.files))
