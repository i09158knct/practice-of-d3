// http://www.pref.kagawa.lg.jp/jichisin/link/shicho.shtml
var trs = document.querySelectorAll(".xxx table tbody tr");
var data = [].map.call(trs, function(tr) { return {
  city_name: tr.children[0].textContent,
  area: tr.children[3].textContent,
  population: tr.children[4].textContent
}; });
console.log(JSON.stringify(data, null, 2));
