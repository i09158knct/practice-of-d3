path = require 'path'

module.exports = (grunt) ->
  grunt.initConfig
    regarde:
      livereload:
        files: [
          'html/**/*'
        ]
        tasks: ['livereload']


    livereload:
      port: 35729


    exec:
      base_command: 'python -m SimpleHTTPServer'

      server: command: '<%= exec.base_command %>'
      server_background: command: '<%= exec.base_command %> &'



  grunt.loadNpmTasks task for task in [
    'grunt-exec'
    'grunt-regarde'
    'grunt-contrib-livereload'
  ]



  grunt.registerTask 'copy-components', ->
    (
      grunt.file.mkdir pathName
      for source in sources
        fileName = path.basename source
        grunt.log.writeln "copying #{fileName}"
        grunt.file.copy source, "#{pathName}/#{fileName}"

    ) for pathName, sources of {
      'html/js/vendor': [
        'components/backbone/backbone.js'
        'components/underscore/underscore.js'
        'components/jquery/jquery.js'
        'components/d3/d3.js'
        'components/coffee-script/extras/coffee-script.js'
      ]
      'html/css/vendor': [
      ]
      'html/img': [
      ]
    }



  grunt.registerTask name, targets for name, targets of {
    'initialize': ['copy-components']
    'server': ['exec:server']
    'default': [
      'livereload-start'
      'exec:server_background'
      'regarde'
    ]
  }
