// TODO: run progress bar for import
// TODO:" update status once photos uploaded

import { DOM, parentFolder, endpoint } from '../config'
export default class Import {
  import (state) {
    /*
    |* create or update new photo names and then save them to local destination folder
    */
    // display progress bar
    state.status.initProgress()
    // rename files with value from drop down selector
    renameFiles(state.photos.photos, DOM.renameDropDown.value)
    // save files to local folder
    saveFiles(state)
  }
  enableImportBtn (renderStatus, currentFolder) {
    DOM.importBtn.disabled = !(renderStatus && currentFolder)
  }
  quit () { window.close() }
}
const renameFiles = (fileList, reNumType) => {
  /*
  |* renames files according to value of dropDownRename select button
  */
  if (reNumType === '0') {
    clearRenames(fileList) // if rename type is Do not rename clear any previous rename values and return
    return
  }
  const reNum = parseInt(reNumType, 10)
  // loop through all photos in the list
  fileList.forEach((photo, index) => {
    // get file extension
    const fileExt = photo.name.slice(photo.name.indexOf('.'))
    // create/update rename property of photo
    // pad with leading zeros
    // trim length based on rename type
    photo.rename = `000${reNum + index}${fileExt}`.slice(-(fileExt.length + reNumType.length))
  })
}
const clearRenames = fileList => {
  fileList.forEach(photo => {
    if (photo.rename) {
      delete photo.rename // remove rename property
    }
  })
}
const saveFiles = (state) => {
  /*
  |* sends requests to server to save photos locally
  */
  state.import.importComplete = false
  let chunk = 1 // progress bar is divided into chunks equal to fileList.Length. This sets the first one
  state.photos.photos.forEach(photo => {
    // create data object to upload to server
    const data = {
      file: photo.dataURL,
      name: photo.rename ? photo.rename : photo.name,
      folder: `${parentFolder}/${state.destinations.currentFolder}/`
    }
    // create request for server
    const request = new Request(endpoint.saveFiles, { // eslint-disable-line 
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // send data to server TODO: change this to async await
    fetch(request) // eslint-disable-line 
      .then((resp) => resp.json())
      .then(() => { state.status.renderProgress(chunk++, state.photos.photos.length) })
      .catch(function (error) {
        console.log(error.name)
      })
  })
  state.import.importComplete = true
  state.status.updateStatusMessage(state)
}
