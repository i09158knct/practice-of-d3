var width = 700;
var height = 470;
var centeredCity;

var projection = d3.geo.mercator()
  .scale(40000)
  .translate([0, 0]);

projection.center([133.947083, 34.288472]);

var path = d3.geo.path().projection(projection);

var svg = d3.select('#main .map')
  .attr('width', width)
  .attr('height', height);

svg.append('rect')
  .attr('class', 'background')
  .attr('width', width)
  .attr('height', height);

var g = svg.append('g')
  .attr('transform', _s.sprintf('translate(%f,%f)', width / 2, height / 2))
  .append('g')
    .attr('id', 'areas');

d3.json('data/geo/kagawa0.001.json', function(err, geojson) {
  g.selectAll('path')
    .data(geojson.features)
    .enter()
    .append('path')
      .attr('d', path)
      .attr('class', function(datum) { return datum.properties['N03_004'] })
      .on('click', click);
});

function getCityName(datum) {
  return datum.properties['N03_004'];
}

function click(datum) {
  if (!datum) return;

  var x = 0;
  var y = 0;
  var k = 1;

  if (centeredCity !== datum) {
    centeredCity = datum;
    x = - path.centroid(datum)[0];
    y = - path.centroid(datum)[1];
    k = 2;
  } else {
    centeredCity = null;
  }

  // to colorize same city's island
  var clickedCityName = getCityName(datum);
  g.selectAll('path')
    .classed('active', centeredCity && function(datum) {
      return getCityName(datum) === clickedCityName
    });

  g.transition()
    .duration(500)
    .attr('transform', _s.sprintf('scale(%d)translate(%d,%d)', k, x, y))
    .style('stroke-width', (1.5 / k) + 'px');
}
