import { configureStore } from './store'
import { configureAbility } from './abilities'
import { loadSession } from './session'

export function configure(config) {
  return Promise.all([
    configureStore(config),
    configureAbility(config),
    loadSession(config)
  ])
}
