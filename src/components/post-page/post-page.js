import { DataStore } from '../../services/ds'

export class PostPage {
  static inject = [DataStore]

  constructor(ds) {
    this.ds = ds
    this.post = null
  }

  activate(params, route) {
    return this.ds.find('Post', params.id)
      .then(post => {
        this.post = post
        route.navModel.setTitle(post.title)
      })
  }
}
