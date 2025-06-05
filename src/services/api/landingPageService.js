import landingPageData from '../mockData/landingPages.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let pages = [...landingPageData]

export const landingPageService = {
  async getAll() {
    await delay(300)
    return [...pages]
  },

  async getById(id) {
    await delay(250)
    const page = pages.find(p => p.id === id)
    if (!page) {
      throw new Error('Landing page not found')
    }
    return { ...page }
  },

  async create(pageData) {
    await delay(400)
    const newPage = {
      ...pageData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      analytics: {
        views: 0,
        clicks: 0,
        conversions: 0
      }
    }
    pages = [newPage, ...pages]
    return { ...newPage }
  },

  async update(id, updatedData) {
    await delay(350)
    const index = pages.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Landing page not found')
    }
    pages[index] = { ...pages[index], ...updatedData }
    return { ...pages[index] }
  },

  async delete(id) {
    await delay(300)
    const index = pages.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Landing page not found')
    }
    pages = pages.filter(p => p.id !== id)
    return true
  }
}