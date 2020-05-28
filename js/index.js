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
    bounds.extend(latlng)
    createMarker(latlng, name, address)
  })
  map.fitBounds(bounds)
}

function createMarker(latlng, name, address) {
  var html = "<b>" + name + "</b> <br/>" + address;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
  google.maps.event.addListener(marker, 'click', function() {
    console.log('bubu')
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}