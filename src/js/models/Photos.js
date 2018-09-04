import { DOM } from '../config'
export default class Photos {
  constructor () {
    this.photos = []
    this.renderComplete = false
  }
  // download & display photos from source
  async loadPhotos (fileList) {
    this.renderComplete = false
    this.photos = []
    // clear display
    this.clearThumbs()
    // process the photos
    for (const file of fileList) {
      if (!file.type.includes('image')) continue
      try {
        // 1. get  photo
        const photo = await this.getPhoto(file)
        // 2. render photo
        this.renderThumb(photo)
      } catch (error) { console.log(error) }
    }
    this.renderComplete = !!fileList.length
  }
  // store the photo in the state
  async getPhoto (photo) {
    // initialise file reader
    try {
      // await photo read
      const dataURL = await readPhoto(photo)
      // save the photo
      const newPhoto = {
        name: photo.name,
        dataURL
      }
      this.photos.push(newPhoto)
      return newPhoto
    } catch (error) {
      window.alert('Error getting photo. See console for details')
      console.log(error)
    }
  }
  renderThumb (photo) {
    const markup = `
  <span>
      <img class="thumb" src="${photo.dataURL}" title="${photo.name}"/>
  </span>
  `
    DOM.thumbsPanel.insertAdjacentHTML('beforeend', markup)
  }
  clearThumbs () {
    DOM.thumbsPanel.innerHTML = ''
  }
}
// read photo file from camera
const readPhoto = (photo) => {
  const reader = new FileReader() //eslint-disable-line
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(photo)
    reader.onerror = () => {
      reader.abort()
      reject(new Error('Problem parsing input file.'))
    }
    reader.onload = () => {
      resolve(reader.result)
    }
  })
}
