import { parseHTML } from '../src/parser.js'
let assert = require('assert')

it('parse a single element', () => {
  let doc = parseHTML('<div></div>')
  let div = doc.children[0]
  assert.equal(div.tagName, 'div')
  assert.equal(div.children.length, 0)
  assert.equal(div.type, 'element')
  assert.equal(div.attributes.length, 2)
})

it('parse a single element with text content', () => {
  let doc = parseHTML('<div>hello</div>')
  let text = doc.children[0].children[0]
  assert.equal(text.content, 'hello')
  assert.equal(text.type, 'text')
})

it('tag mismatch', () => {
  try {
    let doc = parseHTML('<div></vid>')
  } catch (e) {
    assert.equal(e.message, "Tag start end doesn't match!")
  }
})

it('text with <', () => {
  let doc = parseHTML('<div>a < b</div>')
  let text = doc.children[0].children[0]
  assert.equal(text.content, 'a < b')
  assert.equal(text.type, 'text')
})

it('with property', () => {
  let doc = parseHTML('<div id=a class="cls" data="abc"></div>')
  let div = doc.children[0]

  let count = 0

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }
    if (attr.name === 'class') {
      count++
      assert.equal(attr.value, 'cls')
    }
    if (attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }
  assert.ok(count === 3)
})

it('with property 2', () => {
  let doc = parseHTML('<div id=a class="cls" data="abc"></div>')
  let div = doc.children[0]

  let count = 0

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }
    if (attr.name === 'class') {
      count++
      assert.equal(attr.value, 'cls')
    }
    if (attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }
  assert.ok(count === 3)
})

it('with property 3', () => {
  let doc = parseHTML('<div id=a class="cls" data="abc"/>')
  let div = doc.children[0]

  let count = 0

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }
    if (attr.name === 'class') {
      count++
      assert.equal(attr.value, 'cls')
    }
    if (attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }
  assert.ok(count === 3)
})

it('script', () => {
  let content = `
    <div>abcd</div>
<span>x</span>
/script>
<script>
<
</
</s
</sc
</scr
</scri
</scrip
</script `
  let doc = parseHTML(`<script>${content}</script>`)
  let text = doc.children[0].children[0]

  assert.equal(text.content, content)
  assert.equal(text.type, 'text')
})

it('attribute with no value', () => {
  let doc = parseHTML('<div class />')
})

it('attribute with no value', () => {
  let doc = parseHTML('<div class id/>')
})

it('attribute with no value', () => {
  let doc = parseHTML('<div        />')
})

it('self closed single element', () => {
  let doc = parseHTML('<div/>')
})

it('tagName with Capital letter', () => {
  let doc = parseHTML('<divA></divA>')
})

it('after attribute name', () => {
  let doc = parseHTML('<div />')
})

it('before single quote attribute value', () => {
  let doc = parseHTML("<div class='></div>")
})

it('single quote attribute value end', () => {
  let doc = parseHTML("<div class='cls'></div>")
})

it('after quote attribute value', () => {
  let doc = parseHTML("<div class='cls'666></div>")
})

it('unquoted attribute value selfClosing startTag', () => {
  let doc = parseHTML('<div id=a/>')
})

it('unquoted  attribute value end', () => {
  let doc = parseHTML('<div id=a></div>')
})

it('empty tagname', () => {
  let doc = parseHTML('</>')
})

it('before attribute value', () => {
  let doc = parseHTML('<div id=   "a"/>')
})

it('selfClosing startTag with EOF', () => {
  let doc = parseHTML('<div /')
})

it('attribute with no value', function () {
  let document = parseHTML('<div id = ></div>')
  let div = document.children[0]

  let count = 0

  for (const attr of div.attributes) {
    if (attr.name === 'id') {
      count++
      assert.equal(attr.value, '')
    }
  }

  assert.ok(count === 1)
})
