import { DataStore } from '../../services/ds'

export class Posts {
  static inject = [DataStore]

  constructor(ds) {
    this.ds = ds
    this.posts = []
  }

  remove(post) {
    return this.ds.destroy('Post', post._id)
      .then(() => this.posts.splice(this.posts.indexOf(post), 1))
  }

  activate() {
    return this.ds.findAll('Post')
      .then(posts => this.posts = posts)
  }
}
