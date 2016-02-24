# OpenFin How To: Hello World

### Prerequisits
####You will need:

- A computer running Windows 8 or higher or a Mac running Parrallels, VirtualBox or similar, to allow Windows 8 or higher to be run.

- A web browser, preferably Google Chrome.

- A code editor of your choice.

- An internet connection.

## 1. Create your web app

### 1.1 Create a main html file
First create a directory in the root of your project called 'src'. You may structure your project any way you see fit, this structure is not de rigueur for OpenFin. In 'src' we will create an html file to be the main app file and we will follow convention and call it 'index.html'. Add the following code to 'src/index.html' to create a minimal HTML page.

```
<html>
  <head></head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

### 1.2 Create a localhost server 
This will allow you to develop yor app on your local machine. Other methods and technologies are available and will work just as well, eg Apache or IIS, but for this example we will be using a simple Node/Express server. This requires Node to be installed. If you do not have Node installed, download it from [here](https://nodejs.org/en/)

Create a file called server.js at same level as the 'src' directory we created at step 1. Add the following code.

```
var   express = require('express')
    , http = require('http')
    , path = require('path');

var app = express();

app.set('title','OpenFin DemoApp');
app.use(express.static(path.join(__dirname, 'src')));

/* serves main page  */
app.get('/', function (req, res) {
    res.sendFile("src/index.html", {"root": __dirname});
});

/* process.env.PORT is used in case you want to push to Heroku, for example, here the port will be dynamically allocated */
var port = process.env.PORT || 9070;

http.createServer(app).listen(port, function(){
    console.log('Express server listening on port ' + port);
});

```

We now need to add some dependencies for the server. Using a command-line terminal, navigate to the root directory of your project and run:

```
$ npm install --save express
```
followed by 

```
$ npm init
```
which will take you through the steps to create a 'package.json' file to store dependency information and more about your project.

If you are unfamiliar with usin NPM for package dependencies read their documentation [here](https://docs.npmjs.com/getting-started/using-a-package.json) .

### 1.3 Run your sever
Start the express server. Still in the terminal type:

```
$ node server
```
You should see a message in the terminal 'Express server listening on port 9070'.

Keep the terminal window open (closing it will close the server). Open your web browser at [http://localhost:9070](http://localhost:9070) . 

You should see your "Hello World" index html page. 

You now have an ultra-minimal web app ready to packaged up as an OpenFin app.


## 2. OpenFin your app

### 2.1 Create an OpenFin config file
This is the file which will specify how your OpenFin app appers and behaves. 

Create a file, in the src directory, called 'app_local.json'. You may name the file whatever you like as long as it is correctly targeted when generating the installer (of which, more later). You may create a number of app.json files, eg: for local, alpha, beta and staging versions of your app.

Add the following code to the app_local.json:

```
{
  "devtools_port": 9090,
  "startup_app": {
    "name": "OpenFin Demo App",
    "description": "A demo OpenFin app",
    "url": "http://localhost:9070",
    "uuid": "openfin-demo-application",
    "autoShow": true
  },
  "runtime": {
    "arguments": "",
    "version": "stable"
  },
  "shortcut": {
    "company": "OpenFin",
    "description": "OpenFin appseed",
    "name": "OpenFin appseed"
  }
}
```
A full list and explanation of configurable properties may be found at [https://openfin.co/application-config/](https://openfin.co/application-config/) .

 The cruical properties are:
 
 - "url". This is the path to the main 'index.html' file for the application.
 - "runtime":{"version":"stable}. This is the version of the runtime you wish to target. "stable" gives you the most recent stable build.
 - "uuid" This is the Unique ID of the app you are running. You cannot have two apps with the same ID running on the same desktop.

 
 
### 2.2 Create an OpenFin installer
The installer is generated via a url, like this:

```
https://dl.openfin.co/services/download?fileName=openfin_appseed&config=http://localhost:9070/app_local.json 
```
The parts of the url are as follows:

**https://dl.openfin.co/services/download :** The path to OpenFin's app generator - this must not be altered.

**?fileName=nameOfTheGeneratedInstallerApp :** The name you wish the installer to have once downloaded.

**&config=http://localhost:9070/app_local.json :** The url to the config file created in step 2.1.

Navigate to the URL in a web browser, it will download an .exe file. Run the file and you should see your OpenFin 'Hello World' app.

##3. Adding JavaScript

Your app, as built in the preceeding steps, will run exactly the same in Chrome and OpenFin. When developing real world apps reusability is often a prime concern. You may wish your app to function as an OpenFin app but also perform, unmodified, on the web and mobile too.

OpenFin's additional functionality will, most likely, account for a small percentage of your code so it is wise to write a conditional statement to discover if you are running within OpenFin's runtime and the OpenFin API is available or degrade gracefully on Web and mobile. For example:

```
document.addEventListener("DOMContentLoaded", function(){
    init();
});

function init(){
/* Code common to both OpenFin and browser to go above.
   Then the specific code for OpenFin and browser only to be
   targeted in the try/catch block below. 
*/
    try{
        fin.desktop.main(function(){
            initWithOpenFin();
        })
    }catch(err){
        initNoOpenFin();
    }
};

function initWithOpenFin(){
    alert("OpenFin is available");
    // Your OpenFin specific code to go here...
}

function initNoOpenFin(){
    alert("OpenFin is not available - you are probably running in a browser.");
    // Your browser-only specific code to go here...
}

```
 Add the link to the javaScript into your 'index.html'.

--
## OpenSource resources

Mac virtual machine (to run Windows on Mac): [VirtualBox](https://www.virtualbox.org/)

Code Editors: [Atom](https://atom.io/), [Visual Studio Code](https://code.visualstudio.com/). [Notepad++](https://notepad-plus-plus.org/)

Browser: [Google Chrome](https://www.google.com/chrome/)

Terminal Apps: The [Git Bash](https://git-for-windows.github.io) terminal tool comes with the whole Git package and is a failrly foolproof way of running npm commands.



## Building from this repository
If you would rather cut-to-the-chase and don't want to follow the steps above manually, clone this repository. 

This is a vanilla JavaScript app seed for developing OpenFin apps. It is free from frameworks and build systems, though you may add them as you see fit.
 
It has a simple Node/Express server for local development.

Clone the repo and run

```
$ npm install
```
NB: on a Mac you may need to type 'sudo npm install'

Navigate to the root folder where 'server.js' resides with your command line tool and run:

```
$ node server
```

This should start a simple Node server at [http://localhost:9070](http://localhost:9070), then, click the link below to install as an openFin app.

If you wish to change to localhost port you will need to change the references in "server.js", "app.json" and in the installer link below.

[installer](https://dl.openfin.co/services/download?fileName=openfin_appseed&config=http://localhost:9070/app.json)