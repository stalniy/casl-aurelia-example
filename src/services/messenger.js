import Message from 'prophetjs'

export class Messenger {
  configure(options = {}) {
    Message.parent = options.parent
  }

  notify(message, options = {}) {
    return new Message(message, Object.assign({
      type: 'default'
    }, options)).show()
  }

  success(message, options = {}) {
    return this.notify(message, { ...options, type: 'success' })
  }

  error(message, options = {}) {
    return this.notify(message, { ...options, type: 'error' })
  }
}
