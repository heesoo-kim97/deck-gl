

mapboxgl.accessToken = 'pk.eyJ1IjoiaHNraW04ODk0IiwiYSI6ImNsamd6cGwwdDBkaTEzcXA1bThiYjU0d3UifQ.ROUZosmduCnZ-BF8kdlw8A';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [127.5, 36], // Set your desired center coordinates //[127.5, 36]
    zoom: 6.5 // Set the initial zoom level //6.5
  });

  const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

  const layers =  [
    new deck.GeoJsonLayer({
      id: 'airports',
      data: AIR_PORTS,

      filled: true,
      pointRadiusMinPixels: 2,
      opacity: 1,
      pointRadiusScale: 2000,
      getRadius: f => (11 - f.properties.scalerank),
      getFillColor: [200, 0, 80, 180],

      pickable: true,
      autoHighlight: true
    }),
    new deck.ArcLayer({
      id: 'arcs',
      data: AIR_PORTS,
      dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
      getSourcePosition: f => [-0.4531566,51.4709959], // London
      getTargetPosition: f => f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1
    })
  ];
  
/*
  const deckOverlay = new deck.MapboxOverlay({
    layers: [
      new deck.GeoJsonLayer({
        id: 'airports',
        data: AIR_PORTS,
  
        filled: true,
        pointRadiusMinPixels: 2,
        opacity: 1,
        pointRadiusScale: 2000,
        getRadius: f => (11 - f.properties.scalerank),
        getFillColor: [200, 0, 80, 180],
  
        pickable: true,
        autoHighlight: true
      }),
      new deck.ArcLayer({
        id: 'arcs',
        data: AIR_PORTS,
        dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
        getSourcePosition: f => [-0.4531566,51.4709959], // London
        getTargetPosition: f => f.geometry.coordinates,
        getSourceColor: [0, 128, 200],
        getTargetColor: [200, 0, 80],
        getWidth: 1
      })
    ]
  }); */

  const mapboxOverlay = new deck.MapboxOverlay({
    layers: layers,
    onWebGLInitialized: function(gl) {
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
    }
  });
  
map.on('load', function() {
  map.addLayer(mapboxOverlay);
});

  /*
  map.on('load', function() {
    mapboxOverlay.setProps({ map: map });
  });*/

  