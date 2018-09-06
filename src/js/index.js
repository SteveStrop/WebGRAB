import { DOM } from './config'
import * as ctrl from '../controllers/ctrl'
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
window.addEventListener('load', () => ctrl.init(state))
// Select Button event listener
DOM.selPhotoBtn.addEventListener('click', () => { ctrl.selectBtn(state) })// visible select button
DOM.hideSelPhotoBtn.addEventListener('change', () => { ctrl.hideSelBtn(state) }) // hidden <input type="file" multiple/> button
// Edit List event listener
DOM.editListBtn.addEventListener('click', () => DOM.hideEditListBtn.click())
DOM.editListBtn.addEventListener('focus', () => state.destinations.addFolder())
// Destination radio event listener
DOM.radioPanel.addEventListener('click', () => { ctrl.radioPanel(state) })
// Import event listener
DOM.importBtn.addEventListener('click', () => state.import.import(state))
// Quit button event listener
DOM.quitBtn.addEventListener('click', () => state.import.quit())
