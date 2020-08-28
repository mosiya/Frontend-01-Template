import { create, Text, Wrapper } from './createElement'
import { Timeline, Animation } from './animation.js'
import { ease } from './cubicBezier.js'

export class ListView {
  constructor(config) {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
    this.state = Object.create(null)
  }

  //attribute
  setAttribute(name, value) {
    this[name] = value
  }

  getAttribute(name) {
    return this[name]
  }

  appendChild(child) {
    this.children.push(child)
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }

  render() {
    let data = this.getAttribute('data')
    return (
      <div class="list-view" style="width:300px;">
        {data.map(this.children[0])}
      </div>
    )
  }
}
