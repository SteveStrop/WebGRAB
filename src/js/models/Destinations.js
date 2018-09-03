import { DOM, endpoint } from '../config'
export default class Destinations {
  async getDestinations () {
    // eslint-disable-next-line
    const stream = await fetch(endpoint.getDestinations)  // returns readable stream
    const data = await stream.json()
    this.folders = JSON.parse(data)
  }
  editList () {
  }
  render (folders) {
    folders.forEach(folder => renderFolder(folder))
  }
  clearPanel () {}
}
const renderFolder = folder => {
  const markup = `
  <li>
    <input type="radio" name="destRads" id="${folder}" value="${folder}">
    <label for="${folder}" class="destinationLabel"> ${trimName(folder)}
    </label>
</li>
`
  DOM.radioPanel.insertAdjacentHTML('beforeend', markup)
}
const trimName = folder => folder.slice(folder.startsWith('1000') ? 12 : 8)
