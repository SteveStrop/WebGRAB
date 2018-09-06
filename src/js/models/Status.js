import { DOM } from '../config'
export default class Status {
  initProgress () {
    this.renderProgress(0)
    this.showProgressBar(true)
  }
  renderProgress (index, total = 1) {
    const segment = index * 100 / total // set fractional width
    DOM.bar.style.width = `${segment}%`
  }
  showProgressBar (show) {
    // display progress bar div if show is true
    DOM.progressBar.setAttribute('class', show ? '' : 'hidden')
  }
  updateStatusMessage (state) {
    /*
    |* returns message associated with FIRST true condition
    */
    // create message conditions and strings [condition,message]
    const messages = [
      [state.import.importComplete, 'Photos imported'],
      [DOM.importBtn.disabled && !state.photos.renderComplete, 'Select photos'],
      [state.photos.renderComplete && !state.destinations.currentFolder, 'Choose destination folder'],
      [state.destinations.currentFolder, 'Ready to import (renamed) photos']
    ]
    for (const [condition, message] of messages) {
      if (condition) {
        // display corresponding message
        DOM.statusMessage.innerText = message
        break
      }
    }
  }
}
