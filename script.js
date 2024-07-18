const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []

// helper function to set attributes on dom elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// create elements for links and photos and add to dom
function displayPhotos() {
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

    // add href to image container
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

// Unsplash API
const count = 10
const apiKey = 'your_api_key_goes_here'
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
  console.log('scroll!')
})

// Get photos from api on load
getApiPhotos()

