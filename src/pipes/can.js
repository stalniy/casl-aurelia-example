import { Ability } from 'casl'

export class CanValueConverter {
  static inject = [Ability]
  signals = ['ability-changed']

  constructor(ability) {
    this.ability = ability
  }

  toView(subject, action) {
    return this.ability.can(action, subject)
  }
}
