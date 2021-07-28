let logCss = 'background-color:blue; padding: 0 0.5em 0 0.5em; border-radius: 1em; color: white;'
console.log('%cindex.js', logCss, 'loaded')

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      const regs = await navigator.serviceWorker.getRegistrations()
      if (regs.length == 0) {
        try {
          const reg = await navigator.serviceWorker.register('serviceWorker.js')
          console.log('%cserviceWorker.js', logCss, 'registered')
        } catch (err) {
          console.log('Service worker registration failed: ', err)
        }
      } else {
        regs.forEach(reg => reg.update())
        console.log('%cserviceWorker.js', logCss, 'found')
      }    
    })
}


let geoToggle = document.querySelector('#geoToggle')
let distEl = document.querySelector('#dist')
let info = document.querySelector('#info')

let geoWatchID
geoToggle.addEventListener('click', () => {
    if(!geoWatchID) {
        geoWatchID = navigator.geolocation.watchPosition(success, error, options)
        alert('started tracking')
    }
    else {
        navigator.geolocation.clearWatch(geoWatchID)
        geoWatchID = null
        alert('stoped tracking')
    }
})

let oldCoords
let distance = 0

function success(position) {
    let coords = position.coords
    info.innerHTML += coords.latitude + ", " + coords.longitude + "<br>"
    if (oldCoords) distance += calcCrow(coords.latitude, coords.longitude, oldCoords.latitude, oldCoords.longitude)
    distEl.textContent = Math.round((distance + Number.EPSILON) * 1000) / 1000  + ' km'
    oldCoords = position.coords
} 
function error() {
    alert('Sorry, no position available.')
}
const options = {
    enableHighAccuracy: true,
    maximumAge: 5000,
    timeout: 10000
}




//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) 
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}