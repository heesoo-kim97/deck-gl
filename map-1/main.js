// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const deckgl = new deck.DeckGL({
  container: 'map-container',
  // Set your Mapbox access token here
  mapboxApiAccessToken: 'pk.eyJ1Ijoia2F0YW1hcmFuaTQiLCJhIjoiY2ppNDdtenh5MDFkYTN2b2VjOG5ucmIybCJ9.AG0bncC30hHPHVRnVGeCxQ',

  initialViewState: {
    latitude: 40,
    longitude: 40,
    zoom: 6.5,
    bearing: 0,
    pitch: 30,
  },
  controller: true,

  layers: [
    new deck.GeoJsonLayer({
      id: 'airports',
      data: AIR_PORTS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: f => (11 - f.properties.scalerank),
      getFillColor: [200, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onClick: info => info.object && alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
    }),
    new deck.ArcLayer({
      id: 'arcs',
      data: AIR_PORTS,
      dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
      // Styles
      getSourcePosition: f => [-0.4531566,51.4709959], // London
      getTargetPosition: f => f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1
    })
  ]
});