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
      awsProfile: 'default',
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

### AWS Credentials
If an `awsProfile` parameter is supplied, the aws-sdk will read credentials from that profile and use them for your invalidation job. If no awsProfile is supplied, credentials will be loaded from the following environment variables if available:

```json
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```


You can also store them in a git ignored credential file and pass them as options to the grunt job:

```json
{
  "accessKeyId": "ACCESS_KEY",
  "secretAccessKey": "SECRET_ACCESS_KEY"
}
```

Then in the job options:
```javascript
grunt.initConfig({
  cloudfront: {
    options: {
      region:'us-east-1', // your AWS region
      distributionId:"YOUR_DISTRIBUTION_ID", // DistributionID where files are stored
      credentials:grunt.file.readJSON('path/to/aws/credentials.json'), // !!Load them from a gitignored file
      listInvalidations:true,
      listDistributions:false,
      version:"1.0"
    }
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
