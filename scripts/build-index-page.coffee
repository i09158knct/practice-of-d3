fs   = require 'fs'

dir = process.argv[2]
files = fs.readdirSync(dir).filter (file) ->
  [
    /^_/
    /^css$/
    /^data$/
    /^img$/
    /^js$/
    /^index.ejs$/
  ].every (pattern) ->
    !file.match(pattern)

console.log """
<h1>Programs</h1>
<ul>
  <% #{ JSON.stringify(files) }.forEach(function(file) { %>
    <% var filename = file.replace(/\.(ejs|jade)$/, '.html'); %>
    <li><a href="<%= filename %>"><%= filename %></a></li>
  <% }); %>
</ul>
"""
