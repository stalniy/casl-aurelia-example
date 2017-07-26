import { child } from 'aurelia-framework'
import { Session } from '../../services/session'
import { Messenger } from '../../services/messenger'

export class Root {
  static inject = [Session, Messenger]

  constructor(session, messenger) {
    this.session = session
    this.messenger = messenger
  }

  get isLoggedIn() {
    return !!this.session.token
  }

  configureRouter(config, router){
    this.router = router
    config.title = 'Blog Application'
    config.options.pushState = true
    config.map([
      { route: '', name: 'home', moduleId: '../posts/posts', nav: true, title: 'Home' },
      { route: 'new', name: 'newPost', moduleId: '../post-form/post-form', title: 'Add Post' },
      { route: 'posts/:id/edit', name: 'editPost', moduleId: '../post-form/post-form' },
      { route: 'posts/:id', name: 'viewPost', moduleId: '../post-page/post-page' },
      { route: 'login', name: 'login', moduleId: '../login-form/login-form', title: 'Login' }
    ]);

    config.mapUnknownRoutes('home')
  }

  logout() {
    return this.session.destroy()
      .then(() => this.messenger.success('You have been successfully logged out'))
  }

  attached() {
    this.messenger.configure({ parent: this.messagesPlaceholder })
  }
}
