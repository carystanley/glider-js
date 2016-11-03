
module.exports=function(grunt){
    grunt.initConfig({
        browserify:{
            dist:{
                options:{
                    transform:[['babelify',{'loose':"all"}]]
                },
                files: {
                    './module.js':['./main.js']
                }
            }
        },
        watch:{
            scripts:{
                files:['./*.js'],
                tasks:['browserify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default',["watch"]);
    grunt.registerTask('build',["browserify"]);
};

