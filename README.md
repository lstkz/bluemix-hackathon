## Sadness API

## Description
An API for detecting sad sentences in the github comments.

## Requirements
* node `^8` https://nodejs.org/en/
* npm `^4`
* CF tool https://github.com/cloudfoundry/cli#getting-started

## Configuration

|Name|Description|
|----|-----------|
|`PORT`| The port to listen|
|`VERBOSE_LOGGING`| The flag if debug logging in enabled|
|`GITHUB_TOKEN`| The github token to use for API requests. Create it here https://github.com/settings/tokens. Don't check any permissions.|


## Local deployment

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves the app in prod mode. It will override config with `config/production.js`|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|


## Bluemix deployment
1. go to https://console.eu-gb.bluemix.net
2. click *Create*
3. pick *SDK for Node.js*
4. pick any free *App name* and click *Create*
5. Click on the app and go to tab *Getting started*
6. Download the Starter Code from Bluemix by clicking *DOWNLOAD STARTER CODE*
7. Unpack this starter code to a different location, and *only* copy the manifest.yml to your project directory
8. If you copied `manifest.yml` to your project directory, you can just run `cf push` for deployment.  If you didn't copy over the manifest.yml, you'll have to tell `cf push <appnamehere>`
9. Open https://console.bluemix.net/catalog/services/tone-analyzer/?env_id=ibm%3Ayp%3Aus-south and add this service to your created app.
![Alt text](https://monosnap.com/file/rQjOuQ6C8tUyoi8se53iSBNXD1e944.png)


Example URL: https://sky90210.mybluemix.net/api/tones   
Update this url in extension source code
