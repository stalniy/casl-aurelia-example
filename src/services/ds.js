import { DataStore as PersistedStore } from 'js-data'
import { LocalStorageAdapter } from 'js-data-localstorage'
import { All } from 'aurelia-framework'


export class DataStore extends PersistedStore {
  static inject = [All.of('DS_INITIALIZER')]

  constructor(initializers = []) {
    super({
      mapperDefaults: {
        idAttribute: '_id'
      }
    })

    this.registerAdapter('local', new LocalStorageAdapter(), { default: true })
    initializers.forEach(initialize => initialize(this))
  }

  findAll(type, query = {}, options = {}) {
    const { useCache, ...restOptions } = options
    restOptions.force = !useCache

    return super.findAll(type, query, restOptions)
  }

  save(type, object) {
    const action = object.isNew()
      ? this.create(type, object)
      : this.update(type, object._id, object)

    return action.catch(error => {
      if (!object.isNew() && typeof object.revert === 'function') {
        object.revert()
      }

      return Promise.reject(error)
    })
  }
}
