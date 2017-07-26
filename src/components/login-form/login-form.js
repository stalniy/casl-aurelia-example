import { NewInstance } from 'aurelia-framework'
import { ValidationController, ValidationRules } from 'aurelia-validation'
import { Router } from 'aurelia-router'
import { Session } from '../../services/session'
import { Messenger } from '../../services/messenger'

export class LoginForm {
  static inject = [Session, Router, Messenger, NewInstance.of(ValidationController)]

  constructor(session, router, messenger, validationController) {
    this.session = session
    this.router = router
    this.messenger = messenger
    this.controller = validationController
    this.credentials = { email: '', password: '' }
  }

  save() {
    return this.controller.validate()
      .then(result => result.valid ? this.createSession() : null)
  }

  createSession() {
    return this.session.create(this.credentials)
      .then(() => {
        this.credentials.email = ''
        this.credentials.password = ''
        this.controller.reset()
        this.router.navigate('/')
        this.messenger.success('You have been successfully logged in')
      })
      .catch(() => {
        this.messenger.error('Invalid email or password')
      })
  }

  created() {
    ValidationRules
      .ensure('email').required().email()
      .ensure('password').required().minLength(6)
      .on(this.credentials)
  }
}
