import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

type Type = 'stateful' | 'stateless'

export interface IOptions {
  selector?: any
  type?: Type
  wrapper?: (tree) => any
}

export interface ITestComponentProps {
  ref?: (ref) => void,
  setRef?: (ref) => void
  setRoot?: (root) => void
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

  let __ref = undefined
  let __root = undefined

  const cloneOptions: ITestComponentProps = {}

  // Stateless
  if(options.type && options.type == 'stateless') {

    cloneOptions.setRef = (ref) => {
      __ref = ref
    }
    
    //__root = {  }

  }
  // Stateful
  else {

    cloneOptions.ref = ref => __ref = ref
    cloneOptions.setRoot = (root) => {
      __root = root
    }

  }

  const clone: any = React.cloneElement(tree, cloneOptions)
  const _tree = (typeof options.wrapper == 'function') ? options.wrapper(clone) : clone

  render(_tree, options.selector)

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
    container: clone,
    original: tree,
    ref: __ref,
    root: __root,
    unmount
  }

}
