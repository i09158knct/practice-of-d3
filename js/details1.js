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

d3.json('data/geo/kagawa0.001multi.json', function(err, json) {
  areas.selectAll('path')
    .data(json.features)
    .enter()
    .append('path')
      .attr('class', 'area')
      .attr('d', path);
});




d3.json('data/city/kagawa.json', function(err, json) {
  var cityTable = buildCityTable(json);
  var MainView = buildMainViewClass(cityTable);
  window.main = new MainView();
});

function buildCityTable(areasJSON) {
  return areasJSON.reduce(function(acc, city) {
    acc[city['city_name']] = city;
    return acc;
  }, {});
}

function buildMainViewClass(cityTable) {
  return Backbone.View.extend({
    el: '#main',
    events: {
      'mouseover .area': 'onAreaMouseover'
    },
    templates: {
      details: _.template(
        '<h3 class="city_name"><%= city_name %></h3>' +
        '<ul>' +
        '  <li>面積: <%= area %></li>' +
        '  <li>人口: <%= population %></li>' +
        '  <li>人口密度: <%= population / area %></li>' +
        '</u>'
      )
    },

    onAreaMouseover: function(event) {
      var target = event.target;
      var feature = d3.select(target).datum();
      var cityName = feature.properties['N03_004'];
      this.showDetails(cityName);
    },

    showDetails: function(cityName) {
      var json = cityTable[cityName];
      var html = this.templates.details(json);
      this.$('.details').html(html);
    }
  });
}
