# CASL and Aurelia integration

* [CASL](https://stalniy.github.io/casl/) is an isomorphic authorization JavaScript library which restricts what resources a given user is allowed to access
* [Aurelia](http://aurelia.io) is a JavaScript client framework for mobile, desktop and web leveraging simple conventions and empowering creativity. The main benefit of Aurealia is that resulting code is highly portable and testable, it's easy to read and support.
* [js-data](http://www.js-data.io/v3.0/) is a framework-agnostic, datastore-agnostic JavaScript ORM built for ease of use and peace of mind. Works in Node.js and in the Browser.

This blog application shows how to integrate CASL in Aurelia based application.
Application uses standard [aurelia cli](http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/the-aurelia-cli) setup with minor changes:
* all custom elements and attributes are in `src/components` folder
* value converters are in `src/pipes`
* bootstrap component is in `src/components/root` folder

## Installation

First of all, you will [Aurelia CLI](http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/the-aurelia-cli)

```sh
npm install -g aurelia-cli
```

then clone this repository and run:

```sh
npm install
au run --watch
```

Now you open http://localhost:9000 where you will see application.


## Configuration

* `js-data` mappers configuration can be found at `src/config/store`
* `Session` is fetched for each page reload at `src/config/session`
