# angular-meteor-socially-tutorial-simplified

Implementation of [this Meteor advanced tutorial](http://www.angular-meteor.com/tutorials/socially/angular1/bootstrapping) with simplified architecture. A complementary project for this one: https://github.com/YagoLopez/angular-meteor-1.3-boilerplate 




## Architecture:

- **Client side code** are located in `/client/components/` directory (*.html templates, *.js components*, etc.)
- **Code shared by client and server** are located in the `/imports/` directory. (For example, *models*)
- **Server side code** are located in `/server/` directory (For example, *Meteor methods*)
- **Dependencies**: main angular dependencies and imports are declared in the entry file: `/client/app.js`. The rest of the files only declare their own dependencies and the dependecy of `app.js`. This way the main dependencies are only declared one time and propagated to the other files. Compare this architecture with the code of the [original tutorial](http://www.angular-meteor.com/tutorials/socially/angular1/bootstrapping)




## Demo

- The demo is located at this url: 
- The demo is hosted at Heroku.com as a sleeping process. It needs to be booted so it can take some time to start
- You can log in with the following credentials: username: "usuario1@usuario1.com" and password: "usuario1" or you can create a user with new credentials.





## Stack

- **Front-end**: AngularJS 1.5.5 and EcmasScript 2015 (ES6)
- **Back-end**: Meteor 1.3 and NodeJS
- **Database**: MongoDB
- **Realtime data:** WebSockets





## Requirements for running the application
- [Meteor Framework](http://www.meteor.com) 1.3+
