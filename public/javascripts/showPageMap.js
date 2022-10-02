mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v9', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 4, // starting zoom
    projection: 'globe' // display the map as a 3D globe
});

map.addControl(new mapboxgl.NavigationControl());

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});

const marker1 = new mapboxgl.Marker()
.setLngLat(campground.geometry.coordinates)
.setPopup(
   new mapboxgl.Popup({offset:25})
    .setHTML(`<h2>${campground.title}</h2><p>${campground.location}<p/>`)
)
.addTo(map);

