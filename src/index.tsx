import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

type Type = 'stateful' | 'stateless'

export interface IOptions {
  ref?: any
  selector?: any
  type?: Type
  wrapper?: (tree) => any
}

export interface ITestComponentProps {
  ref?: any,
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
export default function mount (Tree, _options?: IOptions) {

  const options = {
    selector: document.getElementById('root'),
    ..._options
  }

  /*
  NOTE:
  The type is any because we don't know what is being passed in.
  */
  let __ref = React.createRef<any>()
  let __root = undefined

  const cloneOptions: ITestComponentProps = { }

  // Stateless
  if(options.type && options.type == 'stateless') {
    
    //__root = {  }

  }
  // Stateful
  else {

    cloneOptions.ref = (options && options.ref) ? options.ref : __ref
    cloneOptions.setRoot = (root) => {
      __root = root
    }

  }

  let clone = null
  const Clone: any = React.cloneElement(Tree, cloneOptions)
  let _Tree = (typeof options.wrapper == 'function') ? options.wrapper(Clone) : Clone

  render(_Tree, options.selector)

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
    container: Clone,
    original: Tree,
    ref: __ref,
    root: __root,
    unmount
  }

}
