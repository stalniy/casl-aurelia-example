import { NewInstance } from 'aurelia-framework'
import { ValidationController, ValidationRules } from 'aurelia-validation'
import { Router } from 'aurelia-router'
import { DataStore } from '../../services/ds'

export class PostForm {
  static inject = [DataStore, NewInstance.of(ValidationController), Router]

  constructor(ds, validationController, router) {
    this.ds = ds
    this.controller = validationController
    this.router = router
    this.post = this.ds.createRecord('Post')
    this.originalPost = null
  }

  save() {
    return this.controller.validate()
      .then(result => result.valid ? this.savePost() : null)
  }

  savePost() {
    if (this.originalPost) {
      Object.assign(this.originalPost, this.post.toJSON())
    }

    return this.ds.save('Post', this.originalPost || this.post)
      .then(() => this.router.navigate('/'))
  }

  setOriginal(post) {
    this.originalPost = post

    return Object.assign(this.post, post.toJSON())
  }

  created() {
    ValidationRules
      .ensure('title').required()
      .ensure('content').required()
      .on(this.post)
  }

  activate(params) {
    if (params.id) {
      return this.ds.find('Post', params.id)
        .then(post => this.setOriginal(post))
        .catch(() => alert('No such post!'))
    }
  }
}
