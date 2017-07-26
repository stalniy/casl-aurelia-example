import { AbilityBuilder, Ability } from 'casl'
import { DataStore } from '../services/ds'
import { BindingSignaler } from 'aurelia-templating-resources'

function defineRulesFor(user) {
  const { can, rules } = AbilityBuilder.extract()

  can('read', ['Post', 'Comment'])

  if (user) {
    can('create', 'Post')
    can('manage', ['Post', 'Comment'], { authorId: user._id })
    can(['read', 'update'], 'User', { _id: user._id })
  }

  return rules
}

function subjectName(subject) {
  if (!subject || typeof subject === 'string') {
    return subject
  }

  return subject.constructor.mapper.name
}

export function configureAbility({ container }) {
  const ds = container.get(DataStore)
  const ability = new Ability([], { subjectName })
  const updateAbilitiesOf = user => {
    ability.update(defineRulesFor(user))
    container.get(BindingSignaler).signal('ability-changed')
  }

  container.registerInstance(Ability, ability)

  ds.on('afterCreate', (name, session) => {
    if (name === 'Session') {
      updateAbilitiesOf(session.user)
    }
  })

  ds.on('afterFind', (name, id, mapper, session) => {
    if (name === 'Session') {
      updateAbilitiesOf(session.user)
    }
  })

  ds.on('afterDestroy', (name) => {
    if (name === 'Session') {
      updateAbilitiesOf(null)
    }
  })
}
