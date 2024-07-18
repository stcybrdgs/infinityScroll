const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// check if all images were loaded
function imageLoaded() {
  imagesLoaded++
  // console.log(imagesLoaded)
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
    // console.log('ready = ', ready)
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
  imagesLoaded = 0
  totalImages = photosArray.length
  // console.log('totalImages = ', totalImages)

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

// Unsplash API
const count = 30
const apiKey = 'P5-mM7S2jYhYB2D0NzG2KPlx4I7yn0EUnVb6QhSIA80'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Get photos from Unsplash API
async function getApiPhotos() {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    // console.log(photosArray)
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

// Get photos from api on load
getApiPhotos()

