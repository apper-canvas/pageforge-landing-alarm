import themeData from '../mockData/themes.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let themes = [...themeData]

export const themeService = {
  async getAll() {
    await delay(200)
    return [...themes]
  },

  async getById(id) {
    await delay(150)
    const theme = themes.find(t => t.id === id)
    if (!theme) {
      throw new Error('Theme not found')
    }
    return { ...theme }
  },

  async create(themeData) {
    await delay(300)
    const newTheme = {
      ...themeData,
      id: Date.now()
    }
    themes = [...themes, newTheme]
    return { ...newTheme }
  },

  async update(id, updatedData) {
    await delay(250)
    const index = themes.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Theme not found')
    }
    themes[index] = { ...themes[index], ...updatedData }
    return { ...themes[index] }
  },

  async delete(id) {
    await delay(200)
    const index = themes.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Theme not found')
    }
    themes = themes.filter(t => t.id !== id)
    return true
  }
}