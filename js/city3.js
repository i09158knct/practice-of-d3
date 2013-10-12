var width = 700;
var height = 470;

var projection = d3.geo.mercator()
  .scale(40000)
  .translate([width / 2, height / 2]);

projection.center([133.947083, 34.288472]);

var path = d3.geo.path().projection(projection);

var svg = d3.select('#main .map')
  .attr('width', width)
  .attr('height', height);

svg.append('rect')
  .attr('class', 'background')
  .attr('width', width)
  .attr('height', height);

var areas = svg.append('g')
  .attr('id', 'areas');

var cities = svg.append('g')
  .attr('id', 'cities');

d3.json('data/geo/kagawa0.001.json', function(err, json) {
  areas.selectAll('path')
    .data(json.features)
    .enter()
    .append('path')
      .attr('d', path)

});

d3.json('data/city/kagawa.json', function(err, json) {
  cities.selectAll('circle')
    .data(json)
    .enter()
    .append('circle')
      .attr('cx', function(datum) { return projection(datum.location)[0] })
      .attr('cy', function(datum) { return projection(datum.location)[1] })
      .attr('r', 3);

  var cityTable = buildCityTable(json);

  cities.selectAll('g')
    .data(json)
    .enter().append('g').selectAll('line')
      .data(function(datum) { return datum.connection.map(function(name) {
        return [datum.location, cityTable[name].location];
      })})
      .enter().append('line')
        .attr({
          x1: function(datum) { return projection(datum[0])[0] },
          y1: function(datum) { return projection(datum[0])[1] },
          x2: function(datum) { return projection(datum[1])[0] },
          y2: function(datum) { return projection(datum[1])[1] },
          stroke: 'gray',
          'stroke-width': 0.5
        });

});

function buildCityTable(areasJSON) {
  return areasJSON.reduce(function(acc, city) {
    acc[city['city_name']] = city;
    return acc;
  }, {});
}
