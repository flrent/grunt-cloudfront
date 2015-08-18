/*
 * grunt-cloudfront
 * @author Florent Lamoureux (@flrent)
 * Company PayrollHero.com
 * http://github.com/payrollhero/grunt-cloudfront
 *
 * Copyright (c) 2013 PayrollHero.com
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var util = require('util'),
      AWS = require('aws-sdk'),
      _ = require("underscore");

  process.on('SIGINT', function() {
    grunt.log.debug('Shutting down the amazon Cloudfront task...');
    process.exit();
  });

  grunt.registerMultiTask('cloudfront', 'Cloudfront cache invalidating task', function() {
    var done = this.async(),
        options = this.options(),
        version = options.version,
        data = _.omit(this.data, 'options');

    options.credentials = options.credentials || {};
    AWS.config.update({
      region: options.region,
      accessKeyId: options.credentials.accessKeyId,
      secretAccessKey: options.credentials.secretAccessKey,
    });

    var CloudFront = new AWS.CloudFront();

    if(!_.isUndefined(version)) {
      grunt.log.writeln("Version number detected. Changing "+data.Paths.Items.length+" filenames.");
      _.each(data.Paths.Items, function(file, i, files) {

        var lastDot = file.lastIndexOf('.'),
            extension = file.slice(lastDot,file.length),
            fileName = file.slice(0, lastDot),
            newFileName = fileName+"-"+version+extension;

          grunt.log.writeln(fileName + " -> " + newFileName);
      });
    }

    CloudFront.createInvalidation({
      DistributionId:options.distributionId,
      InvalidationBatch:data
    }, function(err, data) {
      if(err) {
        grunt.log.error("Invalidation failed : "+err.message);
        done(false);
      }
      else {
        grunt.log.write("Invalidation succeeded. Please wait a few minutes.").ok();
        console.log(data);
        if(options.listInvalidations) {
          CloudFront.listInvalidations({
              DistributionId:options.distributionId
            },
            function(err, data) {
              if(err) {
                grunt.log.errorlns(util.inspect(err));
              }
              else {
                grunt.log.writeln(util.inspect(data));
              }
              done();
          });
        }
        else {
          done();
        }
      }
    });
    if(options.listDistributions) {
      CloudFront.listDistributions({},function(err, data) {
        if(err) {
          grunt.log.errorlns(err);
          done(false);
        }
        else {
          var distributions = data.Items;
          for(var i=0;i<distributions.length;i++) {
            grunt.log.writeln(util.inspect(distributions[i]));
          }
          done();
        }
      });
    }

  });
};
