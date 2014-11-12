# Cask Angular Components [![Build Status](https://travis-ci.org/caskdata/ng-capsules.svg)](https://travis-ci.org/caskdata/ng-capsules)

  This repo hosts all the zip files of component that will be used common
  across CDAP and Coopr UI projects inside cask. A way to share bower components
  without registering it with bower.

## Set Up

    > npm install
    > gulp zip

  If any new directive/services/filters needs to be added, a new folder needs to
  be created under it and all the required files should be added under it.

  A corresponding zip file will be created under "zip" folder once
  the ```gulp zip``` command is run.

## Development

  To develop/add a new component to the repo the following are assumed for the build
  process.

  1. The folder name for your module, your module name and bower component name should
     be the same. It should be of the format ```cask-angular-<name>```. This is to help
     during the build process of the module while being used as a bower dependency in an app(say CDAP).

  2. The module should have module.js file which "defines" the angular module

     For Example,
     ```javascript
     angular.module("cask-angular-new-module", []);
     ```

  3. The bower.json in the module should define the ```main``` property with files that are
     important to the module. The first file in the array should be module.js.
     This is necessary for the build process as angular expects the module to defined
     before adding a directive/service/filter/controller to it.

     For Example,
     ```javascript
     angular.module("cask-angular-new-module").controller("somecontroller", function() {...})
     ```
     Will fail if ```cask-angular-new-module``` is not defined before. So by defining the module in module.js
     and adding it as the first file in the main we make sure during the build
     process we have module definition as the first step before adding anything
     to the module.

    So your bower.json file will look like this,

    ```javascript
    "name": "cask-angular-new-module",
    "version": "0.0.1",
    "main": [
      "module.js",
      "myDirective.js",
      ...
    ],
    ...
    ```

  4. Any html files under your module will be compiled and added to template cache
     under the name "tpl.html.js". So if you have html files you just need to add
     ```tpl.html.js``` to your ```main``` property in bower.json

  5. Any less files that you define in your module will be compiled to a css file.
     So in your bower.json's main property you will be mentioning ```[yourstylesheet].css```
     instead of ```[yourstylesheet].less```
