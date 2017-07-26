import { bindable } from 'aurelia-framework'
import { DataStore } from '../../services/ds'

export class PostComments {
  static inject = [DataStore]

  @bindable post

  constructor(ds) {
    this.ds = ds
    this.comments = []
  }

  postChanged(post) {
    this.ds.findAll('Comment', { postId: this.post._id })
      .then(comments => this.comments = comments)
  }

  created() {
    this._addComment = (name, comment) => {
      if (name === 'Comment' && this.post._id === comment.postId) {
        this.comments.push(comment)
      }
    }

    this.ds.on('afterCreate', this._addComment)
  }

  detached() {
    this.ds.off('afterCreate', this._addComment)
  }
}
