import { DOM } from '../config'
export const render = (photos) => {
  console.log(typeof (photos), photos)
  const arr = Array.from(photos)
  console.log(arr)
  arr.forEach(photo => {
    renderThumb(photo)
  })
}
const renderThumb = (photo) => {
  console.log(photo)
  const span = document.createElement('span')
  span.innerHTML = `<img class="thumb" src="' + img + '" title="' + imgName + '"/>`
  DOM.thumbsPanel.insertBefore(span, null)
}
