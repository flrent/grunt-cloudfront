# grunt-cloudfront

Grunt task for invalidating cache on Amazon AWS CloudFront with the official AWS SDK for node.js.

## Get Started

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
      version:"1.0" // if you want to invalidate a specific version (file-1.0.js)
    },
    dev: {
      options: {
        distributionId: '** DEV KEY **'
      },
      CallerReference: Date.now().toString(),
      Paths: {
        Quantity: 1,
        Items: [ '/index.html' ]
      }
    },
    live: {
      options: {
        distributionId: '** LIVE KEY **'
      },
      CallerReference: Date.now().toString(),
      Paths: {
        Quantity: 1,
        Items: [ '/index.html' ]
      }
    }
  }
});
```

### AWS Region
You can store your AWS region in the following environment variable and it will be used if available:

```json
AWS_REGION
```

### AWS Credentials
You should store your AWS credentials outside of source control. They will be loaded from the following environment variables if available:

```json
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```


Or you can store them in a git ignored credential file which looks like this:

```json
{
  "accessKeyId": "ACCESS_KEY",
  "secretAccessKey": "SECRET_ACCESS_KEY"
}
```

## Release History
* January 21, 2014 - __0.2.1__ Allow loading of AWS credentials from env
* March 10, 2014 - __0.2.0__ Add multi task option configuration (thanks @steve8708)
* February 27, 2014 - __0.1.1__ Fix dependencies
* May 14, 2013 - __0.1.0__ First release

## License
[Florent Lamoureux](http://twitter.com/flrent)
Licensed under the MIT license.
Copyright (c) 2013 - [http://www.payrollhero.com](PayrollHero.com)
