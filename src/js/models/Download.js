import { DOM, parentFolder, endpoint } from '../config'
export default class Download {
  downloadPhotos (state) {
    renameFiles(state.photos.photos, DOM.renameDrop.value)
    saveFiles(state.photos.photos, state.destinations.currentFolder)
  }
  setReady (renderStatus, currentFolder) {
    DOM.importBtn.disabled = !(renderStatus && currentFolder)
  }
  quit () {}
}
const renameFiles = (fileList, reNumType) => {
  if (reNumType === '0') {
    clearRenames(fileList)
    return
  }
  const reNum = parseInt(reNumType, 10)
  fileList.forEach((photo, index) => {
    const fileExt = photo.name.slice(photo.name.indexOf('.'))
    photo.rename = `000${reNum + index}${fileExt}`.slice(-(fileExt.length + reNumType.length))
  })
}
const clearRenames = fileList => {
  fileList.forEach(photo => {
    if (photo.rename) {
      delete photo.rename
    }
  })
}
const saveFiles = (fileList, destination) => {
  fileList.forEach(photo => {
    const data = {
      file: photo.dataURL,
      name: photo.rename ? photo.rename : photo.name,
      folder: `${parentFolder}/${destination}/`
    }
    const request = new Request(endpoint.saveFiles, { // eslint-disable-line 
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    fetch(request) // eslint-disable-line 
      .then((resp) => resp.json())
      .catch(function (error) {
        console.log(error.name)
      })
  })
}
