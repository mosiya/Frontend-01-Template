import { create, Text, Wrapper } from './createElement'
import { Timeline, Animation } from './animation.js'
import { ease } from './cubicBezier.js'

export class Panel {
  constructor(config) {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
  }

  //attribute
  setAttribute(name, value) {
    this[name] = value
  }

  appendChild(child) {
    this.children.push(child)
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }

  render() {
    return (
      <div class="panel" style="border: solid 1px lightgreen; width:300px;">
        <h1 style="background-color:lightgreen; width:300px; margin:0;">
          {this.title}
        </h1>
        <div style="width:300px; min-height:300px;">{this.children}</div>
      </div>
    )
  }
}
