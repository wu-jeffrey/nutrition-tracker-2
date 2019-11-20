# Server
This folder contains backend code. 

This server follows the microservice pattern and REST architecture so that it can be horizontally scaled and accessesed by platform agnostic clients.

## Getting Started
* After cloning, don't forget to `npm install`!
* To test run: `npm run test`
* To start server: `npm run start`
* To start server with reloading on filesave: `npm run dev`

### Development
* On dev, this server runs on port `5000`. The frontend use a proxy pointed at this port so if you change it make sure to change the proxy too
* To add npm scripts, you can find the `scripts` object in the `package.json` file in `server/`

## Conventions
* Entrypoint is `server.js`
* All services will reside inside `/routes/api/*`
* DB models and ORM/ODM implementation and wrappers will reside in `/db`
* Custom middleware (non-routes) will reside in `/middleware`
* Be as verbose as necessary. Function names should clearly convey their usage, variables should be descriptive
* Use `const` for variables that are not modified after initialization and `let` otherwise
* Where possible, the last key-value pair in an `Object` should have a comma. This helps reduce `Git diffs` when appending key-value pairs to said `Object`.

### Naming
* All routes and API endpoint files should be named using `kebab-case`
* Class and Model names should be `CapitalizedCamelCase` and likewise with their filenames
* Variable names should be `camelCase`

## Testing
* `Mocha.js` is used as our testing framework, `Chai.js` as an assertion library, `supertest` for HTTP testing and `mockgoose` for a testing DB
* The `test` folder structure mimics the `server` folder structure, and the test for each file will be `<name-of-file>.test.js`

### API keys / Sensitive Data
* Several Keys are used: 
1. MongoDB URI
2. Nutritionix API Key
3. Nutritionix APP ID

* As of now, they are exported as a simple `JSON` object and can be `require()`'d where necessary.
* They should be moved to environment variables... will implement when I get my mac

### Technology used
* Node.js: Event-driven nonblocking JS runtime Environment, 
* Express.js: Simplifies writing of API endpoints that follow REST standards
* MongoDB ATLAS: NoSQL DBAAS, picked b/c sharding makes horizontal scalability easy

## End Goal
I want this server to be fast, reliable and expose API endpoints for a web and mobile apps to hit.