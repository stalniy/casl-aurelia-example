export function configureStore({ container }) {
  container.registerInstance('DS_INITIALIZER', function configureMappers(ds) {
    ds.defineMapper('Post', {
      relations: {
        hasMany: {
          Comment: { localField: 'comments', foreignKey: 'postId' }
        }
      }
    })

    ds.defineMapper('Comment', {
      relations: {
        belongsTo: {
          Post: { localField: 'post', foreignKey: 'postId' }
        }
      }
    })

    ds.defineMapper('User')

    ds.defineMapper('Session', {
      idAttribute: 'token'
    })
  })

  container.registerInstance('DS_INITIALIZER', function populateDefaultAuthorId(ds) {
    ds.on('afterCreate', (name, session) => {
      if (name === 'Session') {
        ds.getMapper('Post').recordClass.prototype.authorId = session.user._id
      }
    })

    ds.on('afterFind', (name, id, mapper, session) => {
      if (name === 'Session') {
        ds.getMapper('Post').recordClass.prototype.authorId = session.user._id
      }
    })
  })
}
