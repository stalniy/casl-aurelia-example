import { NewInstance, bindable } from 'aurelia-framework'
import { ValidationController, ValidationRules } from 'aurelia-validation'
import { DataStore } from '../../services/ds'

export class CommentForm {
  static inject = [DataStore, NewInstance.of(ValidationController)]

  @bindable post

  constructor(ds, validationController) {
    this.ds = ds
    this.controller = validationController
    this.comment = this.ds.createRecord('Comment')
  }

  save() {
    return this.controller.validate()
      .then(result => result.valid ? this.saveComment() : null)
  }

  saveComment() {
    const comment = this.ds.createRecord('Comment', this.comment.toJSON())

    comment.postId = this.post._id
    comment.createdAt = new Date()

    return this.ds.save('Comment', comment)
      .then(() => {
        this.comment.author = ''
        this.comment.text = ''
        this.controller.reset()
      })
  }

  created() {
    ValidationRules
      .ensure('author').required()
      .ensure('text').required()
      .on(this.comment)
  }
}
