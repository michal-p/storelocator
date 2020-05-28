var map
var markers = []
var infoWindow
function initMap() {
  var losAngeles = {
    lat: 34.06338,
    lng: -118.35808,
  }
  map = new google.maps.Map(document.getElementById('map'), {
    center: losAngeles,
    zoom: 8,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ]
  })
  var marker = new google.maps.Marker({ position: losAngeles, map: map })
  infoWindow = new google.maps.InfoWindow();
  displayStores()
  showStoresMarkers()
}

function displayStores() {
  var storesHtml = ""
  stores.forEach(function(store, index) {
    var address = store.addressLines
    var phone = store.phoneNumber
    storesHtml += `
      <div class="store">
        <div class="store_contact">
          <div class="store_contact-adress">
            ${address[0]}<br />
            ${address[1]}
          </div>
          <div class="store_contact-phone">${phone}</div>
        </div>
        <div class="store_index">${index + 1}</div>
      </div>
    `
    document.querySelector('.stores-list').innerHTML = storesHtml
  })
}

function showStoresMarkers() {
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function(store, index) {
    var latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude
    )
    var name = store.name
    var address = store.addressLines[0]
    var openUntil = store.openStatusText
    var storeNumber = store.storeNumber
    bounds.extend(latlng)
    createMarker(latlng, name, address, openUntil, storeNumber)
  })
  map.fitBounds(bounds)
}

function createMarker(latlng, name, address, openUntil, storeNumber) {
  var html = `<div class="store-info-window">
    <div class="store-info-name">
      <span>${name}</span>
    </div>
    <div class="store-info-status">
        ${openUntil}
    </div>
    <div class="store-info-address">
        <div class="circle">
              <i class="fas fa-location-arrow" aria-hidden="true"></i>
        </div>
        <span>${address}</span>
    </div>
    <div class="store-info-phone">
        <div class="circle">
            <i class="fas fa-phone-alt" aria-hidden="true"></i>
        </div>
        <span>${storeNumber}</span>
    </div>
  </div>`
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    // draggable:true,
    title: name,
    animation: google.maps.Animation.DROP,

  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}
