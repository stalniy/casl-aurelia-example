import { PLATFORM } from 'aurelia-framework'
import { Session } from '../../services/session'
import { Messenger } from '../../services/messenger'

export class AppRoot {
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
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('../posts/posts'), nav: true, title: 'Home' },
      { route: 'new', name: 'newPost', moduleId: PLATFORM.moduleName('../post-form/post-form'), title: 'Add Post' },
      { route: 'posts/:id/edit', name: 'editPost', moduleId: PLATFORM.moduleName('../post-form/post-form') },
      { route: 'posts/:id', name: 'viewPost', moduleId: PLATFORM.moduleName('../post-page/post-page') },
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('../login-form/login-form'), title: 'Login' }
    ]);

    config.mapUnknownRoutes('home')
  }

  logout() {
    return this.session.destroy()
      .then(() => {
        this.router.navigate('/')
        this.messenger.success('You have been successfully logged out')
      })
  }

  attached() {
    this.messenger.configure({ parent: this.messagesPlaceholder })
  }
}
