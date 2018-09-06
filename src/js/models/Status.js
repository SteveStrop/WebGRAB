import { DOM } from '../config'
export default class Status {
  renderProgress (index, total = 1) {
    const segment = index * 100 / total // set fractional width
    DOM.bar.style.width = `${segment}%`
  }
  showProgressBar (show) {
    // display progress bar div if show is true
    DOM.progressBar.setAttribute('class', show ? '' : 'hidden')
  }
  updateStatusMessage (state) {
    DOM.statusMessage.innerText = getStatus(state)
  }
}
const getStatus2 = state => {
  // create message strings
  const messages = {
    notRenderComplete: 'Select photos',
    notDestination: 'Choose destination folder',
    importEnabled: 'Import (renamed) photos'
  }
  // create selection criteria
  if (!DOM.importBtn.disabled) return messages.importEnabled
  if (!state.photos.renderComplete) return messages.notRenderComplete
  if (!state.destinations.currentFolder) return messages.notDestination
}

const getStatus = state => {
  /*
  |* returns message associated with FIRST true criteria
  */
  // create message strings
  const messages = new Map([
    [1, 'Select photos'],
    [2, 'Choose destination folder'],
    [3, 'Import (renamed) photos']
  ])
  // create selection criteria MUST map 1 for 1 with message string above
  const criteria = new Map([
    [1, !DOM.importBtn.disabled],
    [2, !state.photos.renderComplete],
    [3, !state.destinations.currentFolder]
  ])
  for (let i = 0; i < criteria.size; i++) {
    if (criteria.get(i)) { // if true
      return messages.get(i) // return corresponding message
    }
  }
}
