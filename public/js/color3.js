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

d3.json('data/city/kagawa.json', function(err, areasJSON) {
  window.cityTable = buildCityTable(areasJSON);
  window.color = buildColorScale(areasJSON);

  d3.json('data/geo/kagawa0.001.json', function(err, json) {
    var groups = _.pairs(_.groupBy(json.features, function(f) {
      return f.properties['N03_004']
    })).map(function(pair) {
      return pair.concat(cityTable[pair[0]]);
    });

    areas.selectAll('g')
      .data(groups)
      .enter()
      .append('g')
        .style('fill', function(d, i) {
          return color(d[2].area)
        })
        .selectAll('path')
          .data(function(datum) { return datum[1] })
          .enter()
          .append('path')
            .attr('d', path)
  });
});

function buildCityTable(areasJSON) {
  return areasJSON.reduce(function(acc, city) {
    acc[city['city_name']] = city;
    return acc;
  }, {});
}

function buildColorScale(areasJSON) {
  var areas = _.pluck(areasJSON, 'area');
  var min = Math.min.apply(Math, areas);
  var max = Math.max.apply(Math, areas);
  return d3.scale.linear()
    .domain([min,max])
    .range(['black', 'red']);
}
