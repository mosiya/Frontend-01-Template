## 本周总结

### General

+ Node.appendChild(element)
  + If the element is already a child of the node, then it will remove that element first and them append to the last position
+ DOM API
  + Node interface
    + Nav
      + parentNode
      + childNodes
      + firstChild
      + lastChild
      + nextSibling
      + previousSibling
   + Modify
      + appendChild
      + insertBefore
      + removeChild
      + replaceChild
  + Range interface
   + common
      + var range = new Range()
      + range.setStart(element, 9)
      + range.setEnd(element, 4)
      + var range = document.getSelection().getRangeAt(0)
   + others
      + range.setStartBefore
      + range.setEndBefore
      + range.setStartAfter
      + range.setEndAfter
      + range.selectNode
      + range.selectNodeContents
   + fragment
      + range.selectNodeContents(element); //  put the element’s children into range 
      + var fragment = range.extractContents(); //  extract the content in range from DOM into the fragment
      + range.insertNode(element)
+ CSSOM
  + document.styleSheets
   + document.styleSheets[0].cssRules
   + document.styleSheets[0].insertRule(“p {color: red}}”, 0)
   + document.styleSheets[0].removeRule(0)
  + window.getComputedStyle(elt, pseudoElt)
  + View:
   + window.open()
   + window.close()
   + element.scrollBy()
   + element.scrollTo()
   + element.getClientRects()  //  return an array of all boxes from an inline element
   + element.getBoundingClientRects()  //  return the whole rect
+ Others
  + data URI
   + data:text/html,&lt;div>x&lt;/div>  //  generate a html DOM with the div in body
