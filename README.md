# grunt-cloudfront

Grunt task for invalidating cache on Amazon AWS CloudFront with the official AWS SDK for node.js.
This repo is different from other CloudFront task because it uses the official AWS node.js SDK.
##  Started

Install this grunt plugin next to your project's grunt.js gruntfile with: `npm install grunt-cloudfront --save-dev`

Then add this line to your project's `Gruntfile.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-cloudfront');
```

## Usage

```javascript
// Project configuration.
grunt.initConfig({
  cloudfront: {
    options: {
      region:'us-east-1', // your AWS region
      distributionId:"YOUR_DISTRIBUTION_ID", // DistributionID where files are stored
      credentials:grunt.file.readJSON('path/to/aws/credentials.json'), // !!Load them from a gitignored file
      listInvalidations:true, // if you want to see the status of invalidations
      listDistributions:false, // if you want to see your distributions list in the console
      version:"1.0", // if you want to invalidate a specific version (file-1.0.js)
    },
    invalidate: { // this must be a valid CloudFront invalidation batch
      "Paths": {
        "Quantity": 1,
        "Items": [
            "/js/myfile.js"
        ]
      },
      "CallerReference": moment().format() // use unique identifier for this invalidation
    }
  }
});
```

## Release History
* May 14, 2013 - __1.0.0__ First release

## License
[Florent Lamoureux](http://twitter.com/flrent)  
Licensed under the MIT license.  
Copyright (c) 2013 - [http://www.payrollhero.com](PayrollHero.com)