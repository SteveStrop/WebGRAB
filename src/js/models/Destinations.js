import { DOM, endpoint } from '../config'
export default class Destinations {
  async getDestinations () {
    // eslint-disable-next-line
    const stream = await fetch(endpoint.getDestinations)  // returns readable stream
    const data = await stream.json()
    this.folders = JSON.parse(data)
  }
  getCurrentFolder () {
    // find selected destination folder
    for (const radioBtn of DOM.destRads) {
      if (radioBtn.checked) {
        this.currentFolder = radioBtn.value
        return this.currentFolder
      }
    }
    this.currentFolder = ''
    return this.currentFolder
  }
  async addFolder () {
    await this.getDestinations()
    this.renderFolders(this.folders)
    // probably just need to update destinations panel
  }
  renderFolders (folders) {
    if (!folders) return
    clearPanel()
    folders.forEach(folder => renderFolder(folder))
  }
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
const clearPanel = () => { DOM.radioPanel.innerHTML = '' }
