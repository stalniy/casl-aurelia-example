import { DataStore } from './ds'

const TOKEN_NAME = 'token_id'

export class Session {
  static inject = [DataStore]

  constructor(ds) {
    this.token = localStorage[TOKEN_NAME]
    this.ds = ds
    this.mapper = ds.getMapper('Session')
  }

  create(credentials) {
    return this.ds.findAll('User', { email: credentials.email })
      .then(users => users.length ? users[0] : this.ds.create('User', { email: credentials.email }))
      .then(user => {
        return this.mapper.create(Object.assign({ user, token: Date.now() }, credentials))
      })
      .then(session => this.update(session))
  }

  update(attrs) {
    this.token = attrs.token
    this.user = attrs.user
    localStorage[TOKEN_NAME] = this.token

    return this
  }

  find() {
    if (!this.token) {
      return Promise.reject(new Error('No token'))
    }

    return this.mapper.find(this.token)
      .then(session => this.update(session))
  }

  destroy() {
    return this.mapper.destroy(this.token)
      .then(() => this.update({}))
  }
}
