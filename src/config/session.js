import { Session } from '../services/session'

export function loadSession({ container }) {
  return container.get(Session).find().catch(() => {})
}
