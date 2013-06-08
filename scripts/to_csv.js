cities.map(function(city) {
  return [
    city.city_name,
    city.romaji,
    city.area,
    city.population
  ].join(',');
}).join('\n');
