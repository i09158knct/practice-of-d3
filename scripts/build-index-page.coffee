fs   = require 'fs'
jade = require 'jade'

dir = process.argv[2]
files = fs.readdirSync(dir).filter (file) ->
  file.match(/.html$/) &&
  ['index.html', 'skeleton.html'].indexOf(file) == -1

opts =
  pretty: true

locals =
  files: files


html = jade.compile("""
doctype 5
html
  head
    title Index

  body
    h1 Programs
    ul
      each file in files
        li
          a(href=file)= file
""", opts)(locals)

console.log html
