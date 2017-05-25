# plearn.io
multiple player survival  game on web

/index for main page
/profile for profile page

# install Guide 
- install npm & nodejs 
- install mongodb (if you want to check chat system)
- get in to the folder 
- "npm install"
- then you will get node modules 
- "npm start"
- server will run at port 8080
- check at localhost:8080/index 

# Files and Folders Guide
- hello.js
  every thing start here , nodejs server that control everything
- Public.json 
  node modules used in Plearn
- Public 
  contain normal components that you need to build web application 
  # general
  Public/controllers -> contain controllers build by angularjs , deal with nodejs server 
  Public/css -> all css
  Public/images -> general images
  # core
  Public/js -> javascript file that build plearn world and control normal element
  Public/js/genesiz.js -> seeding 
    Random world 
    Control Avatar
    Chat
    Multiplayer 
    Drawing 
    Etc
  Public/js/main.js -> general javascript
  # core
  Public/views
  Public/views/index.html -> main page
  Public/views/profile.html -> profile page
  # no use
  Public/views/plearn_logo
    
