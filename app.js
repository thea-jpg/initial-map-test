mapboxgl.accessToken = "pk.eyJ1IjoidWZubWFwdGVzdCIsImEiOiJja2FybjQ0b2kwbzNoMnhwbG1oNnBwbzh6In0.IEdNzx7pvq0qiHAIZQckJw";
// TK filtering by tag below is majority from https://docs.mapbox.com/mapbox-gl-js/example/filter-markers/
// TK ideally be able to pull this from the data is the map style being referenced, so as to make uploading changing data easier

// ab - define places so it is in scope for where we need to read it
var places;

// ab - call the getJsonObject function (which is defined at the end of this file) and make places equal to the json object that is returned. The file name test.json is currently hard coded in the getJsonObject function
getJsonObject(function(object){
  places = object;
  buildMap();
});

// -ab all the other code is wrapped in a buildMap function so we can run it after the json has loaded in the callback above
function buildMap(){
  console.log("doing");
  // TK variables above for filtergroup
  var filterGroup = document.getElementById('filter-group');

  // TK draws map in #map
   var map = new mapboxgl.Map({
     container: "map",
     // TK this loaded style includes the dataset for filtering and location, and the map tile styling
     style: "mapbox://styles/ufnmaptest/ckb0e5f8q0o3e1il9tpcbvbp0",
  // TK set location for start of this story, point to From Telephoto to Macro location
     center: [151.22,
       -33.8231],
     zoom:12
   });

   //TK add fullscreen controls from https://docs.mapbox.com/mapbox-gl-js/example/fullscreen/
   // TK ideally would be able to control this to be large but not fullscreen, need to break column/margin assigned to col-6
   map.addControl(new mapboxgl.FullscreenControl());
   // TK add navigation control
   var nav = new mapboxgl.NavigationControl();
   map.addControl(nav);

  // TK actual filtering of variables begins here
     map.on('load', function() {
         // Add a GeoJSON source containing place coordinates and information.
         map.addSource('places', {
             'type': 'geojson',
             'data': places
         });

         places.features.forEach(function(feature) {
             var symbol = feature.properties['tags'];
             var layerID = 'poi-' + symbol;

             // Add a layer for this symbol type if it hasn't been added already.
             if (!map.getLayer(layerID)) {
                 map.addLayer({
                     'id': layerID,
                     'type': 'symbol',
                     'source': 'places',
                     'layout': {
                         'icon-image': 'dot-11',
                         'icon-size':6,
                         'icon-allow-overlap': true
                     },
                     'filter': ['==', 'tags', symbol]
                 });

                 // TK following three instructions with map.on are from https://docs.mapbox.com/mapbox-gl-js/example/center-on-symbol/
                 // TK use to focus and change zoom
                 // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
                 map.on('click', layerID, function(e) {
                 map.flyTo({ center: e.features[0].geometry.coordinates });
                 });

                 // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
                 map.on('mouseenter', layerID, function() {
                 map.getCanvas().style.cursor = 'pointer';
                 });

                 // Change it back to a pointer when it leaves.
                 map.on('mouseleave', layerID, function() {
                 map.getCanvas().style.cursor = '';
                 });


                 // Add checkbox and label elements for the layer.
                 var input = document.createElement('input');
                 input.type = 'checkbox';
                 input.id = layerID;
                 input.checked = true;
                 filterGroup.appendChild(input);

                 var label = document.createElement('label');
                 label.setAttribute('for', layerID);
                 label.textContent = symbol;
                 filterGroup.appendChild(label);

                 // When the checkbox changes, update the visibility of the layer.
                 input.addEventListener('change', function(e) {
                     map.setLayoutProperty(
                         layerID,
                         'visibility',
                         e.target.checked ? 'visible' : 'none'
                     );
                 });
             }
         });
     });

  // TK using code from https://docs.mapbox.com/help/tutorials/add-points-pt-3/ placeholder JSON I created
       map.on('click', function(e) {
         // TK var pops identifies the marker pointed to
  var pops = map.queryRenderedFeatures(e.point, {
   layers: ['dataset-ufnp-test'] // TK dataset layer name
  });

  if (!pops.length) {
   return;
  }

  var pops = pops[0];

  // TK offset popup so it doesn't cover the marker

  var popup = new mapboxgl.Popup({ offset: [0, -20] })
    .setLngLat(pops.geometry.coordinates)
    // TK currently displays name of article and link to full article
    .setHTML('<h5>' + pops.properties.name + '</h5><p><a href="' + pops.properties.url + '">read the full story</a></p>')
    .addTo(map);
  });
}


// AB - here is a function to read in the JSON
// AB from here -> https://stackoverflow.com/questions/40287601/loading-json-file-with-plain-javascript-no-framework-no-jquery
// AB note there is a missing bracket in the code on that stackoverflow
// AB the file is hard coded in
function getJsonObject(cb){
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', 'test.json', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');

                   try {
                     cb(JSON.parse(request.responseText));
                   }catch(err) {
                     cb(err);
                   }
        }
    }
}
