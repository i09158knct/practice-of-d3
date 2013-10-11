path = require 'path'

module.exports = (grunt) ->
  grunt.initConfig
    watch:
      livereload:
        files: [
          '**/*'
          '!data/**/*'
        ]
        options:
          cwd: 'public'
          livereload: true


    exec:
      server_base_command: 'harp server'
      server: command: '<%= exec.server_base_command %>'
      server_background: command: '<%= exec.server_base_command %> &'

      harp_compile: command: 'harp compile'



  grunt.loadNpmTasks task for task in [
    'grunt-exec'
    'grunt-contrib-watch'
  ]



  grunt.registerTask 'copy-components', ->
    (
      grunt.file.mkdir pathName
      for source in sources
        fileName = path.basename source
        grunt.log.writeln "copying #{fileName}"
        grunt.file.copy source, "#{pathName}/#{fileName}"

    ) for pathName, sources of {
      'public/js/vendor': [
        'components/backbone/backbone.js'
        'components/underscore/underscore.js'
        'components/underscore.string/lib/underscore.string.js'
        'components/jquery/jquery.js'
        'components/d3/d3.js'
        'components/coffee-script/extras/coffee-script.js'
      ]
      'public/css/vendor': [
      ]
      'public/img': [
      ]
    }



  grunt.registerTask name, targets for name, targets of {
    'initialize': ['copy-components']
    'build': [
      'exec:harp_compile'
    ]
    'server': ['exec:server']
    'default': [
      'exec:server_background'
      'watch'
    ]
  }
