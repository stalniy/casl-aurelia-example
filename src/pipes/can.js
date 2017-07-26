import { Ability } from 'casl'
import { SignalBindingBehavior } from 'aurelia-templating-resources'
import { ValueConverter } from 'aurelia-binding'

export class CanValueConverter {
  static inject = [Ability]

  constructor(ability) {
    this.ability = ability
  }

  toView(subject, action) {
    return this.ability.can(action, subject)
  }
}

export class CanBindingBehavior {
  static inject = [SignalBindingBehavior]

  constructor(signalBindingBehavior) {
    this.signalBindingBehavior = signalBindingBehavior
  }

  bind(binding, source) {
    this.signalBindingBehavior.bind(binding, source, 'ability-changed')

    const sourceExpression = binding.sourceExpression

    if (sourceExpression.rewritten) {
      return
    }

    sourceExpression.rewritten = true

    const expression = sourceExpression.expression
    sourceExpression.expression = new ValueConverter(
      expression,
      'can',
      sourceExpression.args,
      [expression, ...sourceExpression.args])
  }

  unbind(binding, source) {
    this.signalBindingBehavior.unbind(binding, source)
  }
}
