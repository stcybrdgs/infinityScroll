const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let photosLoaded = 0
let totalPhotos = 0
let photosArray = []

// Unsplash API
let count = 5
const apiKey = 'your_unsplash_api_key_goes_here'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// check if all images were loaded
function imageLoaded() {
  photosLoaded++
  if (photosLoaded === totalPhotos) {
    ready = true
    loader.hidden = true

    // after initial page load, increase the number of photos to fetch
    count = 30
  }
}

// helper function to set attributes on dom elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// create elements for links and photos and add to dom
function displayPhotos() {
  photosLoaded = 0
  totalPhotos = photosArray.length

  photosArray.forEach((photo) => {
    // create href anchor for each unsplash photo
    const item = document.createElement('a')
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })

    // add img to href
    const img = document.createElement('img')
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    // event listener to check when each load completes
    img.addEventListener('load', imageLoaded)

    // add href to image container
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

// Get photos from Unsplash API
async function getApiPhotos() {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    displayPhotos()
  } catch (error) {
    console.log('Error: ', error)
  }
}

// when user scrolls near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false
    getApiPhotos()
  }
})

// Get photos from api on page load
getApiPhotos()

