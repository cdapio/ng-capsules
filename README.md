# Cask-Ui Components

  This is the repo that hosts all the zip files of component that will be used common
  across CDAP and Coopr UI projects inside cask. A way to share bower components
  and not push it to bower repo but our own.

## Set Up

      > npm install
      > gulp zip

  If any new directive/services/filters needs to be added a new folder needs to
  be created under it and all required files should be added under it.

  A corresponding zip file will be created under "zip" folder once
  the ```gulp zip``` command is run.
