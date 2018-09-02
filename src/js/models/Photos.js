export default class Photos {
  constructor () {
    this.photos = []
  }
  async getPhoto (photo) {
    console.log(photo)
    // initialise file reader
    try {
      // await photo fetch
      const p = await readPhoto(photo)
      // console.log(`File reader result is ${p}`) // eslint-disable-line
      // save the photo
      const newPhoto = {
        name: photo.name,
        imgData: p
      }
      this.photos.push(newPhoto)
      window.photos = this.photos
      return newPhoto.imgData
    } catch (error) {
      window.alert('Error fetching photo. See console for details')
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
