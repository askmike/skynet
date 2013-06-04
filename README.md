# Skynet

We, a group of students from the [Amsterdam University of Applied Science](http://www.international.hva.nl/), are doing research on improving the attention towards public screens by using Computer Vision techonlogy.

We have a physical setup at our local university building with a screen and a webcam. [VANturelabs](http://vanturelabs.com/) has provided us with audience measurement software running on the setup. Skynet listens to this system and uses this to:

1. Adapt the content on the screen in realtime to the audience.
2. Gather statistics of the attention of the audience.

Skynet consists of a (nodejs) server application and a (webbased) client application which listens to the server for when to display what kind of content. The content used in our tests where user generated [Vine](http://vine.co) videos.

# Overview codebase

The server consists of a couple of things:

* A websocket communication with the clients to (see `server/socket.js`):
  * tell the client the segment it needs to play (adaptive content)
  * listen to which video the client has picked to store in a database.
* A webserver which the Audience Measurement uses to let skynet know who is in front of the camera (see `server/app.js`).
* A datastore (in redis) to store counters of how many people pass by the screen
* A database (mongo) to store complex data like how many people stood in front of the screen during which Vine, and how long the looked towards the screen. (see `server/mongoose.js`).
* A small API which the dashboard uses to retrieve data from the database. (see `server/api.js`).

# License

MIT