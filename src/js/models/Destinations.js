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
  addFolderOld () {
    console.log(`edit list function`)
    DOM.editListBtn.blur()
    const newFolder = `1000000000KA ${window.prompt('Enter new folder name: ')}…`
    if (newFolder) this.folders.push(newFolder)
    this.renderFolders(this.folders)
  }
  addFolder() {
    console.log ('adding folder')
    this.getDestinations()
    this.renderFolders()
    // probably just need to update destinations panel
  }
  renderFolders (folders) {
    if(!folders) return
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
