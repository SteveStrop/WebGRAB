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
const getStatus = state => {
  /*
  |* returns message associated with FIRST true condition
  */
  // create message conditions and strings [index,[condition,message]]
  const messages = new Map([
    [0,
      [DOM.importBtn.disabled && !state.photos.renderComplete, 'Select photos']
    ],
    [1,
      [state.photos.renderComplete && !state.destinations.currentFolder, 'Choose destination folder']
    ],
    [2,
      [state.destinations.currentFolder, 'Ready to import (renamed) photos']
    ]
  ])
  window.m = messages
  // create selection criteria MUST map 1 for 1 with message string above
  /* const criteria = new Map([
    [0, DOM.importBtn.disabled && !state.photos.renderComplete],
    [1, state.photos.renderComplete && !state.destinations.currentFolder],
    [2, state.destinations.currentFolder]
  ])
  */
  for (const value of messages.values()) {
    const condition = value[0]
    const message = value[1]
    if (condition) return message // return corresponding message
  }
}
