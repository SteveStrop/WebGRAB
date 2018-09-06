
export const DOM = {
  hideSelPhotoBtn: document.getElementById('chooseFileBtn'), // hidden file input button
  selPhotoBtn: document.getElementById('selectBtn'), // select photo button
  editListBtn: document.getElementById('addDestinationBtn'), // add destination button
  hideEditListBtn: document.getElementById('setDestBtn'), // hidden file input button used to add new destination
  importBtn: document.getElementById('importBtn'), // import button
  quitBtn: document.getElementById('quitBtn'), // quit button
  renameDropDown: document.getElementById('renameDropDown'), // rename drop down
  progressBar: document.getElementById('progressBar'),
  bar: document.getElementById('bar'),
  statusMessage: document.getElementById('statusMessage'), // displayed in footer
  radioPanel: document.getElementById('radioButtons'), // element containing destination radio buttons
  thumbsPanel: document.getElementById('thumbnails'), // thumbnails div
  destRads: document.getElementsByName('destRads') // destination radio buttons collection
}
export const endpoint = {
  getDestinations: 'http://localhost:3000/radioDestinations', // the API get folders endpoint
  saveFiles: 'http://localhost:3000/post' // the API save endpoint
}
export const parentFolder = 'G:/Estate Agents' // root folder for downloaded photos or camera location hopefully
window.DOM = DOM
export const folderTrim = {
  keyAgentIdentifier: '1000',
  keyAgentTrim: 12,
  HsIdentifier: 'HSS',
  HsTrim: 8
}
