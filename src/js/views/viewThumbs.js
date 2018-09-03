import { DOM } from '../config'
export const renderThumb = photo => {
  console.log(photo.name)
  const markup = `
<span>
    <img class="thumb" src="${photo.dataURL}" title="${photo.name}"/>
</span>
`
  DOM.thumbsPanel.insertAdjacentHTML('beforeend', markup)
}
export const clearThumb = () => { DOM.thumbsPanel.innerHTML = '' }
