# CASL and Aurelia integration

Read [CASL in Aurelia app][casl-aurelia-example] for details.

* [CASL](https://stalniy.github.io/casl/) is an isomorphic authorization JavaScript library which restricts what resources a given user is allowed to access
* [Aurelia](http://aurelia.io) is a JavaScript client framework for mobile, desktop and web leveraging simple conventions and empowering creativity. The main benefit of Aurealia is that resulting code is highly portable and testable, it's easy to read and support.
* [js-data](http://www.js-data.io/v3.0/) is a framework-agnostic, datastore-agnostic JavaScript ORM built for ease of use and peace of mind. Works in Node.js and in the Browser.

This blog application shows how to integrate CASL in Aurelia based application.
Application uses standard [aurelia cli](http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/the-aurelia-cli) setup with minor changes:
* all custom elements and attributes are in `src/components` folder
* value converters are in `src/pipes`
* bootstrap component is in `src/components/root` folder

**Note**: refactored to use CASL 2.0. See [@casl/ability][casl-ability] and [@casl/aurelia][casl-aurelia] for details.


## Installation

Clone this repository and run:

```sh
npm ci
npm start
```

Now you can open http://localhost:9000 to see application.


## Configuration

* `js-data` mappers configuration can be found at `src/config/store`
* `Session` is fetched for each page reload at `src/config/session`

To see application without CASL integration, checkout to `without-casl` branch.

## Abilities

All abilities are defined in `src/config/abilities` and updated each time a new `Session` is created, found or destroyed (i.e., when user log in or log out).
Application uses `can` value convertor with `if` binding:

```html
<li if.bind="'Post' | can: 'create'">
  <a route-href="route: newPost">Add Post</a>
</li>
```

In this case if user has ability to `create` posts, he will see the button, otherwise button will be removed.
For more information about value convertors please refer to [Aurealia documentation](http://aurelia.io/docs/binding/value-converters)

[casl-aurelia-example]: https://medium.com/@sergiy.stotskiy/casl-based-authorization-in-aurelia-app-3e44c0fe1703
[casl-ability]: https://github.com/stalniy/casl/tree/master/packages/casl-ability
[casl-aurelia]: https://github.com/stalniy/casl/tree/master/packages/casl-aurelia

