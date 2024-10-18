console.log(__filename);
// NODE.JS is a js runtime built on google's open-soruce v8 js engine
// Node.js-pros:
//single-threaded, based on event drivern, non-blocking i/o model
// Perfect for building fast and scalable data-intensive apps.
// JS across the entire stack: faster and more efficient development
// NPM: huge library of open=-source packages available for everyone for free!
// Very active developer community

// USE OF NODEJS

// API with database behind it(preferably NoSQL)
// Data streaming(think Youtube)
// Real-time chat application;
// Server-side web application

// DO NOT USE
// Application with heavy-side processing(cpu-intensive)

// INTRODUCTION to BACKEND DEVELOPMENT

// what does actualy happen each time we type url in webpage
/*
    Request-response model or Client-server architecrure(Client sends Request and server sends response)
 
    https://     www.google.com/   maps
    protocol     Domain name   Resource
    HTTP or HTTPS

    We need a away to convert domain name to real address of server and DNS does it for us!

    when we open website, browser makes a request to a DNS and this server will match web address to the server real IP adress

    DOMAIN IS NOT REAL ADRESS, AND DNS CONVERTS IT TO THAT REAL IP ADDRESS.


    this is how real address looks like
    https://        216.58.211.206:      443
    protocol        IP ADRESS             DEFAULT 443 for https, 80 for http
     HTTP or HTTPS


     once we have a real ip adress, next step is TCP(transmision control protocol)/IP(Internet Protocol)CONNECTION. And together they are communication protocls that defines exactly how data travells across the web.


     3RD step we make HTTP(Hyper text trasnfer protocol) request, it is another communication protocol,  COMMUNICATION PROTOCOL -->is system of rules that allows 2 or more parties communicate.
     in a case of HTTP it allows client and web servers to communicate.
     HTTP METHODS: get, post, put, patch, delete.

     GET /maps HTTP/1.1 -->  Start line: HTTP method + request target + http version
     Host: asdasdasdasdasdasd: en-US --> HHTP REQUEST HEADERS(Many different possibilites)
     <BODY>: Request body (only when sending data to server, e.g POST)

     MAIN DIFFERENCE BETWEEN HTTP AND HTTPS. HTTPS is encrypted using TLS or SSL.


     4TH step is HTTP RESPONSE
     HTTP/1.1 200 ok -->  Start line: HTTP method + status code + status message
     Host: asdasdasdasdasdasd:  --> HHTP REQUEST HEADERS(Many different possibilites)
     <BODY>: Request body (most responses)


     5TH STEP 
     index.html is the first to be loaded
     scanned for assets: JS, CSS, IMages
    Process is repeated for each file!

    TCP/IP --> its a communications protocols that defines how data travells across a web.
    FIRST job of TCP is to break up request and responses into 1000 of small chunks called packets before they are set. 
    once they get to their destination it will reassamble all the packets into the original request or response. 
    so that the message arrives at the destinations as quick as possible, which wont be possible to send with 1 big chunk

    As 2nd part the job of IP protocol is to send and route all of this packates through the internet, 
    SO it ensures that all of them arrived at the destination that they should go. using IP adresses on each packet.


    DIFFERENCE BETWEEN DYNAMIC AND API WEBSITES

    Dynamic is called(SERVER-SIDE RENDERED) STEPBYSTEP HAPPENING LIKE THIS: DATABASE-> get data-> build website with template -> html,css,js -><-browser.
    API is called(CLIENT-SIDE RENDERED) STEPBYSTEP HAPPENING LIKE THIS: DATABASE-> get data-> JSON -><-BROWSER -> build websiote with template.
*/

// NODEJS BEHIND SCENES

/*
    Node runtime has several dependencies, most important ones are V8 and libuv

    V8: is a fundamental part in node architecture, it converts js code into machine code and computer can understand because of it.
    libuv: is open source library with a strong focus on asynchronous file, so input output, this layer is what give node access
      to underline computer operating system, file system, networking and more. Besides that it has 2 more exteremly features
      EVENT LOOP and THREAD POOL
    Event loop: responsibble to easy taks, executing callbacks and network io
    Thread pool is for more heavy work, like file access or compression.
    LIBUV is written c++; and v8 is written with js & c++;
    Beauty of this node pipes all this libraries together no matter written in c++ or js and then gives us developer access to their function in pure js

    This architecture allows us to write 100% pure js code and still access function like for filereading, which are emplemented in libuv or other libraries in C++ language.

    Node doesent only rely on V8 and libuv, but also on http-parser(for parcing http), c-ares(DNS request stuff), openSSL(for keptography), zlib(compression)


    // THREAD POOL
    NODE.JS process (instance of a program in execution on a computer)

    Node.js runs on SINGLE THREAD(Sequence of instructions) and
    Initialize program --> Execute "top-level" code --> Require modules --> Register event callback --> Start event loop
    Some taks are actually have to be executed in event loop, because they would block that single threads, and then THREAD POOL is coming.

    Thread pools give us 4 addition threads, that are completely seperate from main single thread and we can actually configure it up to 128 threads.
    this threads together formed a thread pool and the event loop can then automaticly offload heavy tasks to the thread pool. and all this happenes automaticily behind scenes.


    THREAD POOL: 1)Additional 4 thread(or more)
                 2) Offload work from the event loop
                 3) Handle heavy ("expensive") tasks:
                    File system APIs
                    Cryptohraphy
                    Compression
                    DNS lookups



    // EVENT LOOP
    All the application code that is inside callback functions(non-top-top-level code)
    Node.js is build around callback functions
    Event-driver architecture: 1) Events are emitted
                               2) Event loops picks them up
                               3) Callbacks are called 
    Things like our application receiving new http request, timer expiring,  file finishing to  read. All this will emit events as soon as they are done with their work.
        and then our event loop will then pick up this events and call the callbacks function that are associated with this events.
    Summary: EVENT Loop does the orchestration which simply means that it receives events calls their callback functions and offload the more expensive(heavy) taks to thread pool


    Event loop has 4 most important phases.
    1) first takes care of callbacks of expired times, for example from setTimeout functions. So callbacks in each queue are proccesses one by one until there are no ones left in the queue and after that it goes to next phase.
    2) secocd is I/O polling(looking for new I/O event that are ready to be proccessed and putting them into callback queue) and callbacks. I/O means mainly stuff like networking and file access. 99% of our code is executed.
    3) setImmediate callback. this is special timer callback if we want proccess callback imediately after I/O polling and execution phase
    4) Close callbacks. all close events are proccesed. for example for when a webServer or webSocket shut down


    2 other quest
    1) PROCESS.NEXTTICK() queue
    2) OTHER MICROTASKS QUEUE(Resovled promises)

    if there are any callbacks in one of this queue's to be proccessed, they will be executed right after the current phase of event loop finishes instead of waiting for the entire loop to finish

    if there are any pending timers or i/o tasks event loop keeps running, if no it exits program.


    ITS OUR JOB NOT TO BLOCK EVENT LOOP
    1) Dont use sync versions of function is fs, crypto and zlib modules in your callback functions
    2) Don't perform complex calcutations(e.g. loops inside loops)
    3)Be careful with JSON in alrge objects
    4) Dont use too complex regular expression(e.g nested quantifiers)


    EVENT LOOP waits for stuff to happen in poll face, where I/O callbacks are handled, so when this queue of callbacks is empty, event loop will wait in this phase, 
    untill there is expired timer, but if we scheduled a callback using setImmediate, than that callback will be executed right away after polling phase and even before expired timers if there is one

    nextTick is part of micro tasks queue, get executed after each phase. nextTick happens before the next loop phase, and not for entire tick. 
    setImmediate executed once per tick and nextTick is executed immediately.




    // EVENT DRIVEN ARCHITECTURE

        most of node's core modules, like http, file system and timers are build around an event-driver architecture. and we can use this to our advantage.

        In node, there are certain objects called event emitters, that emmits named events as soon as something important happens in the app 
        like request hitting server or timer expiring or file finishing to read

        this are picked up by event listeners that we set up which will fire off callback functions that are attached to each listener

        One hand we have Event emitter on the other hand Event listener that will react to emitted event by calling callback functions.

        const server = http.createServer();
        server.on('request', (req, res) =>{
            console.log('Request received')
            res.send('Requeset received')
        })

        server.on is how we actually create a listener, for request event.
        when new request is made, server acts as emitter and will automatically emit event
        called request, each time request hits server.
        since we already have a listener set up for this exact event, callback function
        that we attach to this listener, will automaticaly be called.


        Server is actually an instance of nodejs Event Emitter class, so it inherits all this event emitting and and listening logic from that event emitter class.

        EventEmitter logic is called an observer pattern in js programming in general and its quite popular pattern in many used cases.
        so eventlistener is observervablew which keeps waiting and observing subject that will eventually emit that event that the listener is waiting for.
        Opposite of this pattern is functions calling other functions, AND observer pattern has been designed to react rather than call!


        const EventEmitter = require("events");
        const myEmitter = new EventEmitter();

        myEmitter.on('newSale', () => { // observer, observe emitter and wait untill it emits new sale event
            console.log('There was a new sale)
        })
        MyEmitter.on("newSale", stock) => {
            console.log(${stock})
        }
        myEmitter.emit("newSale", 9 ) // emits event 

        IN REAL LIFE WE CREATE A NEW CLASS THAT WILL INHERIT FROM NODE EVENT EMITTER
            class Sales extends EventEmitter
            constructour() {
                super(); // we get acces of EventEmitter class
            }
            
            const myEmitter = new Sales();

    // STREAMS
        streams are used to process(read and write) data piece by piece(chunks), without completing the whole 
        read or write operation , and therefore withot keeping all the data in memory.

        Perfect for handing large volumes of data, for example videos;
        more effient data processing in terms of memory(no need to keep all data in memory) and time(we dont
        have to wait until all the data is availabe)

        READABLE STREAMS: Streams from which we can read(consume) data. EXAMPLES: http requests, fs.readstreams
                          IMPORTAN EVENT: data, end. IMPORTANT FUNCTIUONS: pipe(), read()

        WRITABLE STREAMS: Strreams to which we can write data. EXAMPLES: http responses, fs write streams  
                          IMPORTAN EVENT: drain, finish. IMPORTANT FUNCTIUONS: write(), end()


        DUPLEX STREAMS: BOTH READABLED AND WRITABLE. EXAMPLE: web socket(communication channel between client and 
            server that works in both direction and stays open once connection has been established) from net module


        TRANSFORM STREAMS: Duplex streams, Transform data as it is written or read. EXAMPLE: zlib core module
                            to compress data which actually uses transform stream.  Gzip creation

        Streams are instances of the EventEmitter class


        this event and functions are called consuming stream, that are already implemented, like the one in EXAMPLE
        node implemented this http request and responses as stream, then we can consume and use them using the events
        and functions that are available for each type of stream.
        WE can implement our own streams and then consume them using this stream events and functions.

        most important to know is how to consume streams and not how to implement them

        const readable = fs.createReadStream('test-file.txt')
        readable.on('data', chunk => {
            res.write(chunk)
        })
        readable.on('end', () => {
            res.end()
        })

        readable.on("error" err => {
            console.log(err)
            res.statusCode= 500
            res.end("File Not Found")
        })

        BEST SOLUTION
        const readable = fs.createReadStream("test-file.txt");
        readable.pipe(res)
        SOLVES PROBLEM OF BACK PRASSURE

    // THE COMMONJS MODULE SYSTEM
       each JS file is treated as a separate module;
       nodejs uses the commonjs module system: require(), exports or module.exports;
       ES module system is used in browser: import/export
       There have been attempts to bring ES modules to nodejs.(.mjs)


    

       What happens when we require() a module???
       1) Resolving & Loading
       2) Wrapping
       3) Execution
       4) Returning exports
       5) Caching

    RESOVLING & LOADING
       we can load 3 differenct kind of modules
       1) Core Modules require('http');
       2) Developer Modules require('./lib/controller');
       3) 3-rd Party Modules requires('express');

       Path resolving: how node decides which module to load
            1) Start with core modules
            2) if begins with './' or '../' try to load developer module
            3) if no file found try to find folder with index.js in it
            4) else go to node_modules/ and try to find module there

    WRAPPING
       nodejs run time takes the code of our module and puts it inside IIFE. 
       it passes: exports, require, module, __filename, __dirname
       each module having its private scope is absolute crucian, and this is achived wrapping our code into special function
       require: function to require modules;
       module: reference to the current module
       exporst: a reference to module.exports, used to export object from a module
       __filename: absolute path of the current module's file;
       __dirname: directory name of the current module

    Execution
        code in the module wrapper fuction is executed by nodejs runtime

    Returning exports
        require function returns exports of the requireed module;
        module.exports is the returned object(important!)
        Use module.exporsts to export one single variable, e.g one class or one function(module.exports = calculator)

        Use exporst to export multiple named variables
        (exports.add = (a, b) => a + b)
        this is how we import data from one module into another.

     
     CACHING
        Modules are cached after the first time they are loaded, if we require same module multiple times
        WE WILL ALWAYS GET SAME RESULT AND THE CODE IN THE MODULES ARE ONLY EXECUTED IN THE FIRST CALL
        IN SUBSEQUENT CALLS, RESULT is simply retrieved from CACHE


        console.log(arguments) is an array in js. this array contains all the value that we pass into function
        



    EXPRESS
        express is a minimal node.js framework, a higher lever of absctraction(built on top of nodejs)
        express containss a very rebust set of features: complex, routing, easier handling of request and responses,
        middleware, server-side rendering, etc..
        express allows for rapid development of node.js applications: we don't have to re-invent the wheel
        express makes it easier to organize ourapplication into MVC architecture


        const express = require('express');
        const app = express();

        
        const port = 3000
        app.listen(port, () => {
            console.log(`App running on port ${port}`)
        })

        ROUTING
         routing means to determine how app response to a certain client request, so to certain URL. also http method
         used for this request.

         app.get('/' ==>  root URL and http method which is get(req, res) => {

         })

    APIs and RESTFUL API
         api ==> Application Programming Interface: a piece of software that can be used by another piece of software
        in order to allow application to talk each other
        
        Application can  be other things in API
         Node.js fs or http APIs("node APIs")
         Browser's DOM js API;
         with object oriented programming, when exposing methods to the public we are creating an API

    REST ARTICHECTURE:
         it stands for representational stage transfer is a way of building web apis in a logical ways, easy to consume

         To build resful APIS we need to follow couple of principals
         1) Seperate API into logical resources
         2) Expose(made available) using sturcuted, resource-based URLs
         3) Use HTTP methods(verbs);
         4) Send data as JSON(usually)
         5) Be stateless

         Resource: Object or representation of something, which has data associated to it. Any information that 
         can be named can be a resource e.g tours, users, reviews

         Endpoint should contain only resources(Nouns) and use http methods for actions!

         stateless restful API: all state is handled on the client. this means that each request must contain all the
         information necessary tor process a certain request.
         The server should not have to remember previous eq.
         EXAMPLES: loggedin, currentPage

    MIDDLEWARE
         incoming request -----------------------> RES
         req.obj, res.obj
         to process data, in express we use middleware, which can manipulate req or res object or anything.
         express.json is middleware to get access to req.object
         in express everything is a middleware,
         EG: parsing body, logging, setting headers, router
         order of the code matters a lot in express.
         we can think of whole proccess pipeline


         3rd party middlewares, app.use(morgan('dev'))

    Param Middleware
         router.param('id', (req, res, next, val) => {
            console.log(`Tour id is ${val}`)
            next();
         })
         

    Env variables 
         dotenv.config({ path: './config.env }) it will read our variables from the file and save into nodejs env variable
         
         console.log(process.env)

    MOUNTING
         In the context of Express.js, a popular web framework for Node.js, "mounting" refers to the process of attaching a middleware 
         or a sub-application  to a specific path or route. 
         This allows you to organize your application into smaller, more manageable pieces by grouping related routes and middleware together.

    
    MONGODB
        mongoDB is NoSQL database, can contain one or more collections("Tables") and each collection  can contain 
        one or more datastructure DOCUMENTS("ROWS")
        MongoDB is a document database with the scalability and flexibility that you want with the querying
        and indexing that you need

    
        KEY MONGODB FEATURES:
        Document based: Mongodb stores data in documents (field-value pair data structures, NoSQL)
        Scalable: Very easy to distribute data across multiple machines as your users and amount of data grows;
        Flexible: No document data schema required, so each document can have different number and type of fields.
        Perfomant: Embedded data models, indexing, sharding, flexible documents, native duplication, etc.

        DOCUMENT STRUCTURE:
          BSON: Data format MongoDB uses for data storage. Like JSON, but typed. So MongoDB documents are types.
        
          BSON document has fields and data is store in key value pairs. in relation db, each field is called a Column.
          we can have multiple values in one field, but in relational db-s it is not allowed.
          mongodb has exteremly feature which is embedded documents.
          Embedding/Denormalizing: Including related data into a single document. This allows for quicker access
            and easier data modles(It's not always the best solution though)
            In relational db-s data is always normalized, so we can not embed there.


    MONGOSHELL
        use ==> to create and switch to db. or to just switch if it already exists.
        db.tours.inserMany() ==> SO, db is currently used db, and when we want to insert document into it we need to specify collection.
        here it is tours. 
        db.tours.inserMany({ name: "The Forest Hiker", price: 297, rating: 4.7}) ==> We can pass js object into this function and 
        it will then convert it into json and bson 
        db.tours.find() ==> to see documents that we have created
        show.dbs ==> to show db-s
        show.collections ==> shows collections.
        db.tours.inserMany([{}]) ====> we can create a lot of doc-s
        db.tours.find({}) ===> to read data and find docs which we want like find({ difficulty: "easy"})
        db.tours.find({ price: {$lte: 500 }}) queries to find less then or equal to 500
        db.tours.find({ price: {$lte: 500 }, rating: {$gte: 4.8}}) to use AND Operator.
         db.tours.find({ $or: [ {price: {$lte: 500 }}, {rating: {$gte: 4.8}} ] }) TO USE OR OPERATOR 
         db.tours.updateOne({ name: "asd"}, { $set {price: 100}}) ===> TO UPDATE, we need to select document which we want to update 
         and then data which will be updated.
         We update parts of documents using update.
         db.tours.replace() ==> Completely replace content of a document.
         db.tours.deleteMany({name : "asd"}) ==> to delete a lot
         db.tourdeleteMany({}) ==> to delete everything

         to create remote dabase hosted on mongoDB atlas, with this we use remote db hosted on a service called atlas\
         CLUSTER: instance of our db.



        


    MONGOOSE

            dotenv.config({ path: './config.env' }); is used in Node.js applications to load environment variables 
        from a file into process.env. This is done using the dotenv package. Here’s a detailed explanation:
            Mongoose
        is an Object Data Modeling (ODM) library for MongoDB and Node.js, providing a higher level of absctraction.
            its a bit like relationship between express and node, express is alayer of abstraction over regular node
            while mongoose is a layer of abstraction of mongoDB driver
        mongoose allows for rapid and simple development of mongoDB database intercations.
        Features: schemas to model data and relationships, easy data validation, simple query API, middleware, etc...
        Mongoose schema: where we model our data, by describing the structure of the data, default values and validations.
        Mongoose model: a wrapper for schema, providing an interface to the database for CRUD operations

        To create Schema we do like this.   tourSchema = new mongoose.schema({
            name: {
                type: String,
                required: true,
                unique: true,
                // default: 500
            },
            rating: Number,
            price: {
                type: Number,
                required: [true, ' A tour must have a price'].
               
            }
        })

        To create Model out of it. const Tour = mongoose.model('Tour', tourSchema);

        const testTour(Document, which is instance of tour model) = new Tour({
            name: 'The Forest Hiker',
            rating: 4.7
            price: 497
        })

        to save this doc, we must use testTour.save() ==> it will return promise;


    MVC  ARCHITECTURE
        BUSINESS LOGIC: MODEL
        APLLICATION LOGIC: CONTROLLER // to handle application req, interact with models, send back responses.
        PRESENTATION LOGIC: VIEW // graphical interface in an app. 


    CREATING DOCUMENTS
    
    //1) 1 way
    const newTour = new Tour({})
    newTour.save();
    //2) better way, with this way its promise, so we can use async await
    const newTOur = await Tour.create(req.body)

    READING DOCUMENTS
    Tour.find()

    Tour.findById() or Tour.findOne({__id: req.params.id }) they are same but mangoose method is better

    UPDATING DOCUMENTS
    Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true // new updated document will be returned,
    })
    in put request, we would expect original object would be compeltely replaced with the new one.
    patch method is way more useful, it is updating fields.

    Delete DOcuments
    Tour.findByIdAndDelete(req.params.id

        res.status(204) //standard for del operation
    )



    QUERY
        it has a lot of methods like tour.find(), as soon as we use await on query it will execute and come back
         with a dcoument, after that no way of chaining other queries.

         with select, we let users only to see details which we will select, with - we are not shwoing details

         we can use select in schema like select: false and it will hide.

    Aggregation Pipelin
        The aggregation pipeline is a powerful framework for data aggregation provided by MongoDB. It allows for the
         transformation and processing of data within collections through a series of stages. 
         Each stage of the pipeline transforms the documents as they pass through it, ultimately producing 
         a result set.

         The $unwind stage in MongoDB's aggregation pipeline is used to deconstruct an array field from the input 
         documents to output a document for each element of the array. This essentially "flattens" 
         the array field so that each element of the array becomes a separate document in the output.

         Key Points about Virtual Properties:
            Not Stored in the Database: Virtual properties are not stored in the MongoDB database. 
            They exist only in your Mongoose schema definition and are computed when you access them.

            Computed Dynamically: Virtual properties are computed dynamically when you access them. 
            They can be derived from other properties in the document or based on custom logic.

            Getter and Setter Functions: You define virtual properties using getter and setter functions 
            in your Mongoose schema.

            TourSchema.virtual()
            too see we mustr add this properties in mongoose.schema
            toJson: {virtuals: true}
            toObject: {virtuals: true}

            WE CAN NOT USE VIRTUAL PROPERTIES IN QUERY



    Types of Mongoose Middleware:

        Mongoose middleware are functions that are executed before or after certain operations on Mongoose models 
        or documents. They provide a way to implement custom logic such as validation, data manipulation, 
        logging, or triggering additional actions before or after certain database operations occur.

        Document Middleware:
            Middleware functions that are executed before or after certain document operations such as save, 
            validate, init, remove, etc.
        Example: You can use document middleware to hash passwords before saving a user document to the database.

        Query Middleware:
            Middleware functions that are executed before or after certain query operations such as find, 
            findOne, update, remove, etc.
            Example: You can use query middleware to log each database operation for auditing purposes.

        Aggregate Middleware:
            Middleware functions that are executed before or after aggregate operations.
            Example: You can use aggregate middleware to apply custom processing or validation to the result of 
            an aggregation.





    CORE MODULES
    fs (File System): For interacting with the file system.
    http and https: For creating HTTP and HTTPS servers.
    url: For URL resolution and parsing.
    querystring: For parsing and formatting URL query strings.
    crypto: For cryptographic functions.
    stream: For working with streams (more on this below).

    1. Path Module
        Purpose: Provides utilities for working with file and directory paths.

    2. OS Module
        Purpose: Provides operating system-related utility methods and properties.


    Global Objects
        Global Scope: Node.js has several global objects, including global, process, console, and more.
        also __dirname: Directory name of the current module.
            __filename: File name of the current module.


    Buffers
        Purpose: Used to handle binary data directly, especially useful when dealing with streams of binary data.
        const buffer = Buffer.from('Hello, world!', 'utf8');

        console.log(buffer); // <Buffer 48 65 6c 6c 6f 2c 20 77 6f 72 6c 64 21>
        console.log(buffer.toString('utf8')); // 'Hello, world!'




    Web Frameworks: Koa.js and Hapi.js
        Koa.js:
        A minimal and flexible Node.js web application framework.
        Created by the team behind Express.js.
        javascript
        Copy code
        const Koa = require('koa');
        const app = new Koa();

        app.use(async ctx => {
        ctx.body = 'Hello, Koa!';
        });

        app.listen(3000);
        console.log('Server running on http://localhost:3000');


        Hapi.js:

        A rich framework for building applications and services.
        Focuses on configuration-driven approach.
        javascript
        Copy code
        const Hapi = require('@hapi/hapi');

        const init = async () => {
        const server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });

        server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {
            return 'Hello, Hapi!';
            }
        });

        await server.start();
        console.log('Server running on %s', server.info.uri);
        };

        init();



        Import/Export and Local Modules
        CommonJS (require/export):

        javascript
        Copy code
        // myModule.js
        module.exports = {
        greet: function() {
            return 'Hello, world!';
        }
        };

        // main.js
        const myModule = require('./myModule');
        console.log(myModule.greet()); // 'Hello, world!'
        ES6 Modules (import/export):

        javascript
        Copy code
        // myModule.mjs
        export function greet() {
        return 'Hello, world!';
        }

        // main.mjs
        import { greet } from './myModule.mjs';
        console.log(greet()); // 'Hello, world!'



        Native Modules
        Purpose: Allow using C/C++ for performance-critical parts of the application.



        SQL Databases and ORMs
            Connecting to SQL Databases:

                const { Client } = require('pg'); // PostgreSQL example

                const client = new Client({
                user: 'yourusername',
                host: 'localhost',
                database: 'mydb',
                password: 'password',
                port: 5432,
                });

                client.connect();

                client.query('SELECT NOW()', (err, res) => {
                console.log(err, res);
                client.end();
                });


            ORM (Object-Relational Mapping):

            Sequelize (for SQL databases):
          
                const { Sequelize, DataTypes } = require('sequelize');
                const sequelize = new Sequelize('database', 'username', 'password', {
                host: 'localhost',
                dialect: 'mysql' // 'mysql' | 'mariadb' | 'postgres' | 'mssql'
                });

                const User = sequelize.define('User', {
                username: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                birthday: {
                    type: DataTypes.DATE
                }
                });

                sequelize.sync()
                .then(() => User.create({
                    username: 'janedoe',
                    birthday: new Date(1980, 6, 20)
                }))
                .then(jane => {
                    console.log(jane.toJSON());
                });


            ODM (Object-Document Mapping):

            Mongoose (for MongoDB):
            
                const mongoose = require('mongoose');

                mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useUnifiedTopology: true });

                const User = mongoose.model('User', { name: String });

                const user = new User({ name: 'John Doe' });
                user.save().then(() => console.log('User saved'));



            ORM (Object-Relational Mapping)
                Purpose: Used to map objects to rows in a relational database (SQL).
                Databases: SQL databases like MySQL, PostgreSQL, SQLite, and Microsoft SQL Server.
                Popular Libraries:
                Sequelize: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
                TypeORM: Supports various SQL databases and is focused on TypeScript.
                Bookshelf.js: A JavaScript ORM for Node.js, built on the Knex.js SQL query builder.


            ODM (Object-Document Mapping)
                Purpose: Used to map objects to documents in a NoSQL database (document-based).
                Databases: NoSQL databases like MongoDB.
                Popular Libraries:
                Mongoose: The most popular ODM for MongoDB in the Node.js ecosystem.

            Comparison
                Schema Flexibility:
                    ORM: SQL databases require predefined schemas and data types. This enforces data integrity but can be 
                    less flexible when dealing with changing data structures.
                    ODM: NoSQL databases like MongoDB offer more flexible schemas, allowing for dynamic document structures, 
                    which is useful for rapidly evolving data models.

                Data Relationships:
                    ORM: SQL databases are well-suited for handling complex relationships (one-to-one, one-to-many,
                    many-to-many) with the help of joins and foreign keys.
                    ODM: NoSQL databases can handle relationships but typically favor denormalization (embedding documents)
                    over normalization (referencing documents). 

                Query Language:
                ORM: Uses SQL, a powerful and standardized query language, allowing for complex queries and transactions.
                ODM: Uses query languages specific to the NoSQL database (e.g., MongoDB query syntax), 
                which might be simpler but less standardized across different databases.

                Performance:
                ORM: Relational databases can be slower for certain types of operations due to the overhead of joins 
                and schema constraints but can be optimized with indexing and normalization.
                ODM: NoSQL databases are designed for high performance and scalability, especially for read-heavy and 
                write-heavy workloads, but may sacrifice some data integrity features.

                Use Cases:
                ORM: Suitable for applications where data integrity and complex relationships are crucial 
                (e.g., financial applications, traditional enterprise applications).
                ODM: Ideal for applications requiring high scalability, flexible schemas, and rapid development cycles 
                (e.g., real-time analytics, content management systems).

                Popularity and Usage
                ORMs like Sequelize and TypeORM are popular for traditional applications needing structured,
                 relational data storage. They are widely used in enterprise applications, e-commerce platforms, and any 
                 scenario where data integrity and relationships are crucial.
                ODMs like Mongoose are highly popular in the Node.js ecosystem for MongoDB. They are favored in startups 
                and applications that require quick iteration and flexibility in data models, such as social media platforms,
                content management systems, and real-time analytics.

                Better Choice?
                It depends on the use case:
                If you need structured data with complex relationships and transactions, an ORM with an SQL database is
                typically better.
                If you need flexibility, scalability, and rapid development, an ODM with a NoSQL database like MongoDB 
                is often the better choice.



    Demystifying the Reactor Design Pattern in Node.js

        The Reactor Design Pattern is a design pattern used to handle service requests delivered  concurrently to a service handler
        by one or more inputs. It efficiently manages multiple I/O events without blocking the program. The core components of the pattern are:
                Event Loop: A loop that continuously checks for new events and processes them.
                Event Demultiplexer: A mechanism to queue and manage multiple events.
                Event Handlers: Functions or methods that are called in response to an event.

        Node.js uses the Reactor Pattern to handle asynchronous I/O operations. Here's how it works in Node.js:
                Event Loop: Node.js runs a single-threaded event loop that handles all asynchronous operations.
                Event Demultiplexer: Uses the libuv library, which is a multi-platform support library with a focus on asynchronous I/O.
                Event Handlers: User-defined functions that are executed when an event is emitted.
                                            
        The Event Demultiplexer in Node.js is managed by libuv, which provides an abstraction for different operating systems to handle asynchronous I/O in a consistent manner. 
        It handles polling for I/O events and provides a mechanism to queue these events.


        What is the Reactor Pattern, and how does Node.js implement it?

        The Reactor Pattern is a design pattern used for handling concurrent I/O operations in an efficient manner. Node.js implements this pattern using an event loop and 
        an event demultiplexer (libuv).  The event loop continuously checks for new events and processes them, while libuv handles the asynchronous I/O operations.
 */
