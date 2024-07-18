const count = 10
const apiKey = 'P5-mM7S2jYhYB2D0NzG2KPlx4I7yn0EUnVb6QhSIA80'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

let apiPhotos = []

// Get photos from Unsplash API
async function getApiPhotos() {
  try {
    const response = await fetch(apiUrl)
    apiPhotos = await response.json()
    // console.log(apiPhotos)
  } catch (error) {
    console.log('Error: ', error)
  }
}

// Get photos from api on load
getApiPhotos()

