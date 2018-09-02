export default class Photos {
  constructor () {
    this.photos = []
  }
  async getPhoto (photo) {
    // console.log(photo)
    // initialise file reader
    try {
      // await photo read
      const dataURL = await readPhoto(photo)
      // console.log(`File reader result is ${p}`) // eslint-disable-line
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
}
const readPhoto = (photo) => {
  const reader = new FileReader() //eslint-disable-line
  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort()
      reject(new Error('Problem parsing input file.'))
    }
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(photo)
  })
}
