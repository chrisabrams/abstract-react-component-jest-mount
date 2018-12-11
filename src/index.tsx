import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

interface IOptions {
  selector?: any
}

/**
 * Create a div to attach to the dom, to be used to mount components for testing.
 */
const docRoot = document.createElement('div')
docRoot.setAttribute('id', 'root')
document.body.appendChild(docRoot)

/**
 * Mount a React Component to the DOM for testing.
 * @param tree The React component or set of components to be mounted.
 * @param _options Options
 */
export default function mount (tree, _options?: IOptions) {

  const options = {
    selector: document.getElementById('root'),
    ..._options
  }

  let __ref = null
  let __root = null

  const clone = React.cloneElement(tree, {
    ref: ref => __ref = ref,
    setRoot: (root) => {
      __root = root
    }
  })

  render(clone, options.selector)

  const unmount = () => {
    unmountComponentAtNode(options.selector)

    /**
     * This hack is needed until the following is merged:
     * https://github.com/facebook/react/pull/13744
     */
    const __selector = document.getElementById(options.selector)

    if(__selector) {
      __selector.outerHTML = ""
    }
  }

  return {
    ref: __ref,
    root: __root,
    unmount
  }

}