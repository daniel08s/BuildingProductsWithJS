# Building products with JavaScript

> Free open-source course

[![Build Status](https://gitlab.com/iskilled/BuildingProductsWithJS/badges/master/build.svg)](https://gitlab.com/iskilled/BuildingProductsWithJS/commits/master)

This repository contains code and related materials for Tim Ermilov's [Building products with javascript](https://www.youtube.com/playlist?list=PL_gX69xPLi-ljVdNhspjZUlPmBNjRgD2X) course.

## Project description

This is a simple client-server CRUD application that allows users to ask and answer questions.  
It uses [express.js](https://expressjs.com/), [passport.js](http://passportjs.org/) with [JWT](https://jwt.io/) and [thinky](http://justonepixel.com/thinky/) along with [RethinkDB](https://www.rethinkdb.com/) on a backend;
For the frontend it uses [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/) and [RxJS](https://github.com/Reactive-Extensions/RxJS).

Backend is tested using [tape](https://github.com/substack/tape) and [supertest](https://github.com/visionmedia/supertest).
Frontend is tested using [jest](https://facebook.github.io/jest/) and [enzyme](https://github.com/airbnb/enzyme).

[Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/) are used for deployment.

## CI/CD

CI and CD for all the subprojects is done using [Gitlab-CI](https://gitlab.com/iskilled/BuildingProductsWithJS).

## Useful links

- [My twitter](https://twitter.com/danielsousa08)
- [Tim's YouTube channel](https://www.youtube.com/c/TimErmilov) with videos covering code
- [Tim's twitter](https://twitter.com/yamalight) with updates on progress (and other stuff)


## License

[MIT](https://opensource.org/licenses/mit-license)
