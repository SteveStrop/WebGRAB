import { DOM } from '../config'
export default class Photos {
  constructor () {
    this.photos = []
    this.renderComplete = false
  }
  async loadPhotos (state, fileList) {
    /*
    |*controller to get photos from central store (camera or folder) to local folders
    */
    if (!fileList) return // do nothing if no photos
    // initialise
    this.renderComplete = false
    this.photos = []
    // display progress bar
    state.status.initProgress()
    // process the photos
    let chunk = 1 // progress bar is divided into chunks equal to fileList.Length. This sets the first one
    for (const file of fileList) {
      try {
        // 1. get  photo from central storage (either camera or folder)
        const photo = await getPhoto(file)
        this.photos.push(photo)
        // 2. render photo in thumbnail panel
        await renderThumb(photo)
        // update the progress bar
        state.status.renderProgress(chunk++, fileList.length) // increment progress bar chunk
      } catch (error) { console.log(error) }
    }
    this.renderComplete = !!fileList.length // false if no files rendered, true otherwise
  }
  // store the photo in the global state
  clearThumbs () {
    DOM.thumbsPanel.innerHTML = ''
  }
}
const getPhoto = async photo => {
  /*
  |* get photo from central storage & save to global state
  */
  try {
    // read photo from central storage
    const dataURL = await readPhoto(photo)
    // create data object to store photo
    const newPhoto = {
      name: photo.name,
      dataURL
    }
    return newPhoto
  } catch (error) {
    window.alert('Error getting photo. See console for details')
    console.log(error)
  }
}
// read photo file from camera or central storage
const readPhoto = photo => {
  const reader = new FileReader() //eslint-disable-line
  // set up promise to return photo once read
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(photo)
    reader.onerror = () => {
      reader.abort()
      reject(new Error('Problem parsing input file.'))
    }
    reader.onload = () => {
      resolve(reader.result) // image as data URL
    }
  })
}
const renderThumb = photo => {
  /*
  |* inject html to display image
  */
  const markup = `
<span>
    <img class="thumb" src="${photo.dataURL}" title="${photo.name}"/>
</span>
`
  DOM.thumbsPanel.insertAdjacentHTML('beforeend', markup)
}
