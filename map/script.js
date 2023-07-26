
    
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0YW1hcmFuaTQiLCJhIjoiY2ppNDdtenh5MDFkYTN2b2VjOG5ucmIybCJ9.AG0bncC30hHPHVRnVGeCxQ'
  /*
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // Set your desired center coordinates
      zoom: 9 // Set the initial zoom level
    });
    
    // Define your data points for the scatterplot layer
    const data = [
      { position: [-74.1, 40.7], color: [255, 0, 0] },
      { position: [-74.2, 40.8], color: [0, 255, 0] },
      { position: [-74.3, 40.9], color: [0, 0, 255] }
    ];
    
    // Create a deck.gl scatterplot layer
    const layer = new deck.ScatterplotLayer({
      id: 'scatterplot-layer',
      data: data,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      getRadius: 100, // Adjust the size of the points
      opacity: 0.8
    });
    
    // Add the deck.gl layer to the map as a custom layer
    map.on('load', () => {
      map.addLayer(layer);
    }); */
  
    
    const map = new mapboxgl.Map({
      container: 'mapbox_map',
      center: [45, 0],
      zoom: 1.5,
      style: 'mapbox://styles/katamarani4/ck5s617rv0px31it4t0l3bd0o',
      maxBounds: [
        [-180, -60], // Southwest coordinates
        [180, 70] // Northeast coordinates
      ]
    });

    console.log("m", mapboxgl);
    console.log("d", deck);


    map.doubleClickZoom.disable();



    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      flyTo: false
    });
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    console.log(geocoder);


    map.on('resize', e => {
      resetWind(map)
    })

    map.on('move', e => {
      resetWind(map)
    })

    map.on('zoom', e => {
      resetWind(map)
    })


    map.once('style.load', function () {
      //resetWind(map)
      map.setPaintProperty('water-fill', 'fill-color', '#24293A'); /*#24293A*/ 
    });

    const data = [
      { position: [-74.006, 40.7128], value: 10 },
      { position: [-73.985, 40.7490], value: 8 },
      // Add more data points as needed
    ];

    const hexagonLayer = new deck.HexagonLayer({
      id: 'hexagon-layer',
      data: data,
      getPosition: d => d.position,
      getColorValue: d => d.value,
      colorRange: [[0, 255, 0]], // Green color
      elevationScale: 100,
      radius: 1000,
    });

    const deckgl = new deck.Deck({
      container: 'hanho',
      layer: [hexagonLayer]
  })

  console.log("dgl", deckgl);

  deckgl.redraw();


/*
    function resetWind(map) {
      const obj = getEventObject(map);
      const { zoomLevel, north, south, west, east, width, height } = obj;
      mapcanvas.style.display = 'none';
      if (windy) {
        windy.stop();
      }
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function () {
        let particleWidth = 0.8;
        if (zoomLevel > 2) {
          particleWidth = 0.6
        }
        if (zoomLevel > 3) {
          particleWidth = 0.4
        }
        if (zoomLevel > 4) {
          particleWidth = 0.2
        }
        if (zoomLevel > 5) {
          particleWidth = 0.07
        }
        if (zoomLevel > 6) {
          particleWidth = 0.05
        }
        mapcanvas.style.display = 'initial';
        mapcanvas.width = width;
        mapcanvas.height = height;
        windy.start(
          [[0, 0], [width, height]],
          width,
          height,
          [[west, south,], [east, north,]],
          { particleLineWidth: particleWidth }
        );
      }, 500)
    } */
/*
    function getEventObject(map) {
      const canvas = map.getCanvas();
      const dimensions = map.getBounds();

      const result = {
        width: canvas.width,
        height: canvas.height,
        north: dimensions.getNorth(),
        south: dimensions.getSouth(),
        west: dimensions.getWest(),
        east: dimensions.getEast(),
        zoomLevel: map.getZoom()
      }
      return result;
    }
/*
    fetch('gfs.json')
      .then(d => d.json())
      .then((data) => {
        console.log(data);
        // Remember - dom elements with ID, are exposed globally, so mapcanvas element exists already
        windy = new Windy({ canvas: mapcanvas, data: data });
        resetWind(map)
      })*/
