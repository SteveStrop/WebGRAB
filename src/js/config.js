export const DOM = {
  hiddenSelectPhotosBtn: document.getElementById('chooseFileBtn'), // hidden file input button
  selectPhotosBtn: document.getElementById('selectBtn'), // select photo button
  editListBtn: document.getElementById('addDestinationBtn'), // add destination button
  hiddenEditListBtn: document.getElementById('setDestBtn'), // hidden file input button used to add new destination
  importBtn: document.getElementById('importBtn'), // import button

  quitBtn: document.getElementById('quitBtn'), // quit button
  renameDrop: document.getElementById('renameDrop'), // rename drop down
  statusMessage: document.getElementById('statusMessage'), // displayed in footer
  radioPanel: document.getElementById('radioButtons'), // element containing destination radio buttons
  thumbsPanel: document.getElementById('thumbnails')
}
export const endpoint = {
  getDestinations: 'http://localhost:3000/radioDestinations'
}
