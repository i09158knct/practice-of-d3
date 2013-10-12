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
  .attr('height', height)

var areas = svg.append('g')
  .attr('id', 'areas')

d3.json('../data/city/kagawa.json', function(err, areasJSON) {
  window.cityTable = buildCityTable(areasJSON);

  d3.json('../data/geo/kagawa0.001.json', function(err, json) {
    areas.selectAll('path')
      .data(json.features)
      .enter()
      .append('path')
        .attr('d', path)
        .attr('class', function(d) {
          return cityTable[getCityName(d)]['romaji'];
        });

    colorize(cityTable);
  });

});

function buildCityTable(areasJSON) {
  return areasJSON.reduce(function(acc, city) {
    acc[city['city_name']] = city;
    return acc;
  }, {});
}

function getCityName(datum) {
  return datum.properties['N03_004'];
}

function colorize(cityTable) {
  var i = 0;
  var colors = d3.scale.category20().range();
  _.each(cityTable, function(details) {
    d3.selectAll('.' + details['romaji'])
      .style('fill', colors[i++]);
  });
}