import { DOM } from '../config'
export default class Status {
  renderProgress (n, d = 1) {
    const segment = n * 100 / d
    DOM.bar.style.width = `${segment}%`
  }
  showProgressBar (show) {
    DOM.progressBar.setAttribute('class', show ? '' : 'hidden')
  }
  updateStatus (state) {
    DOM.statusMessage.innerText = getStatus(state)
  }
}
const getStatus = state => {
  const messages = {
    notRenderComplete: 'Select photos',
    notDestination: 'Choose destination folder',
    importEnabled: 'Import (renamed) photos'
  }
  if (!DOM.importBtn.disabled) return messages.importEnabled
  if (!state.photos.renderComplete) return messages.notRenderComplete
  if (!state.destinations.currentFolder) return messages.notDestination
}
