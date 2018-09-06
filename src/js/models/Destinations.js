import { DOM, endpoint, folderTrim } from '../config'
export default class Destinations {
  async getDestinations () {
  /*
  |* fetches list of destination folders from the server
  */
    // eslint-disable-next-line
    const stream = await fetch(endpoint.getDestinations)  // returns readable stream
    const data = await stream.json() // converts stream to json
    this.folders = JSON.parse(data) // store the parsed json
  }
  getCurrentFolder () {
  /*
  |* gets currently selected radio button in destination folders list
  */
    for (const radioBtn of DOM.destRads) {
      if (radioBtn.checked) {
        this.currentFolder = radioBtn.value // store name of currently selected folder
        return this.currentFolder
      }
    }
    this.currentFolder = '' // no folder selected
    return this.currentFolder
  }
  async addFolder () {
    /*
    |* update list of destination folders called after edit button clicked
    */
    await this.getDestinations()
    this.renderFolders(this.folders)
  }
  renderFolders (folders) {
    if (!folders) return
    clearPanel()
    folders.forEach(folder => renderFolder(folder))
  }
}
const renderFolder = folder => {
  /*
  |* inject html to display a folder name and radio button
  */
  const markup = `
  <li>
    <input type="radio" name="destRads" id="${folder}" value="${folder}">
    <label for="${folder}" class="destinationLabel"> ${trimName(folder)}
    </label>
</li>
`
  DOM.radioPanel.insertAdjacentHTML('beforeend', markup)
}
const trimName = folder => {
  /*
  |* trim length of folder to fit destinations panel
  */
  return folder.slice(folder.startsWith(folderTrim.keyAgentIdentifier) ? folderTrim.keyAgentTrim : folderTrim.HsTrim) // trim 12 chars if a key agent type folder name 8 otherwise
}
const clearPanel = () => { DOM.radioPanel.innerHTML = '' }
