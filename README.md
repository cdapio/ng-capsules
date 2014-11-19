# Cask Angular Components [![Build Status](https://travis-ci.org/caskdata/ng-capsules.svg)](https://travis-ci.org/caskdata/ng-capsules)

  This repo hosts all the zip files of component that will be used common
  across CDAP and Coopr UI projects inside cask. A way to share bower components
  without registering it with bower.

## Why ng-capsules?

  The reason we have ng-capsules is for one main reason

  > To share common components - Directives, Services, Filters, Features or any other common
    javascript functionality shared between different cask front-end projects

  ###Why not just use bower repo?

  The reason we chose to have our own repo is to not have one repo per module as it is not that big and
  we need to have one repo to host all our common modules that we share between cask front-end projects. <br />
  We also didn't want to host our own private bower registry as we wanted to share these modules with the rest of the world and the github setup is pretty simple.

  ###How is done?

  We create bower components which can be managed using bower package manager.
  Each angular module is a standalone bower component (say dropdown-text-combo) and this can be included
  in your project through bower and angular dependency declaration.

  ###How to use ng-capsules in any project?

  The following are the steps that mock the way to include any ng-capsule in your project

    # bower install https://github.com/caskdata/ng-capsules/blob/develop/zip/cask-angular-dropdown-text-combo.zip?raw=true --save

  That is it! Now dropdown-text-combo is available under your ```bower_components/``` folder.
  You then write your gulp/grunt task (or however you want to use/build your bower component(s)) and then include it in your built file (just like you do angular or ui-router or any other angular bower component).

  You can then use it in your app by "declaring" ```cask-angular-dropdown-text-combo``` as dependency to your angular module and then use the directive directly!

  ```javascript
  angular.module('myApp', [
    'cask-angular-dropdown-text-combo',
    ...
  ])
    .config(...)
    .directive(...)
    .filters(...)
    ...

  // In your partial.html file

  <cask-dropdown-text-combo
      data-model="yourModel"
      data-dropdown-list="yourModel.yourList"
      data-text-fields="yourTextFiledData"
      data-asset-label="YourLabel"
  ></cask-dropdown-text-combo>
  ```

**Note**: We recommend the use of gulp or grunt and use ```main-bower-files``` npm module to give you the main files necessary for the each ng-capsule. This is because angular depends on the way script/module files are loaded, like a module has to be defined before adding anything to it. So we define this load order in ```main``` field in bower.json. So ```main-bower-files``` will give you the files that are important and in that order so it will be easier to load the module.
<br />
If you are not using gulp or grunt then please load the script files of any ng-capsule in the order mentioned in the ```main``` field in bower.json file.

## Set Up

    # npm install
    # gulp zip

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
