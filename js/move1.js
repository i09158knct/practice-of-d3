var width = 700;
var height = 470;

var projection = d3.geo.mercator()
  .scale(40000)
  .translate([width / 2, height / 2]);

projection.center([133.947083, 34.288472]);

var path = d3.geo.path().projection(projection);

var zoom = d3.behavior.zoom()
  .translate(projection.translate())
  .scale(projection.scale())
  .scaleExtent([25000, 100000])
  .on('zoom', zoommove);

var svg = d3.select('#main .map')
  .attr('width', width)
  .attr('height', height);

svg.append('rect')
  .attr('class', 'background')
  .attr('width', width)
  .attr('height', height)
  .call(zoom);

var areas = svg.append('g')
  .attr('id', 'areas')
  .call(zoom);

d3.json('../data/geo/kagawa0.001.json', function(err, json) {
  areas.selectAll('path')
    .data(json.features)
    .enter()
    .append('path')
      .attr('d', path);
});


var $scale = $('#scale');
var $translate = $('#translate');
function zoommove() {
  projection.translate(d3.event.translate).scale(d3.event.scale);
  areas.selectAll("path").attr("d", path);

  $scale.text(projection.scale());
  $translate.text(projection.translate());
}
