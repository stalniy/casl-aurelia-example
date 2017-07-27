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

function listenToSessionChanges(ds, onChange) {
  ds.on('afterCreate', (name, session) => {
    if (name === 'Session') {
      onChange(session)
    }
  })

  ds.on('afterFind', (name, id, mapper, session) => {
    if (name === 'Session') {
      onChange(session)
    }
  })

  ds.on('afterDestroy', (name) => {
    if (name === 'Session') {
      onChange(null)
    }
  })
}

export function configureAbility({ container }) {
  const ability = new Ability([], { subjectName })

  container.registerInstance(Ability, ability)

  const ds = container.get(DataStore)
  const signaler = container.get(BindingSignaler)
  listenToSessionChanges(ds, session => {
    const rules = defineRulesFor(session ? session.user : null)
    ability.update(rules)
    signaler.signal('ability-changed')
  })
}
