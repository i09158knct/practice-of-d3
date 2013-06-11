// var geojson = {
//   type: 'FeatureCollection',
//   features: [{type: 'Feature'}]
// };
function convertToMultiPolygon(geojson) {
  var grouped = _.values(_.groupBy(geojson.features, function(feature) {
    return feature.properties['N03_004'];
  }));

  var groupedFeatures = grouped.map(function(features) {
    var base = {
      type: 'Feature',
      properties: _.clone(features[0].properties),
      geometry: {
        coordinates: [],
        type: 'MultiPolygon'
      }
    };

    return features.reduce(function(acc, feature) {
      acc.geometry.coordinates.push(feature.geometry.coordinates);
      return acc;
    }, base);
  });

  return {
    type: 'FeatureCollection',
    features: groupedFeatures
  };
}

