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

d3.json('data/geo/kagawa0.001.json', function(err, json) {
  var groups = _.values(_.groupBy(json.features, function(f) {
    return f.properties['N03_004']
  }));

  var colors = d3.scale.category20().range();

  areas.selectAll('g')
    .data(groups)
    .enter()
    .append('g')
      .style('fill', function(d, i) { return colors[i] })
      .selectAll('path')
        .data(function(features) { return features })
        .enter()
        .append('path')
          .attr('d', path)
});
