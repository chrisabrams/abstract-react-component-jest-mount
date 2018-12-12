import AbstractReactClass from '../../src/index'
import React from 'react'
import { expect } from 'test/helpers'
import mount from '../../src/index'

function getRootTextContent () {
  return document.getElementById('root').textContent
}

interface IPropsStateless {
  message: string
}

function StatelessComponent(props) {

  return <div>{props.message}</div>

}

function StatelessComponentWithRef(props) {

  const setRef = (ref) => {
    if(props.setRef) {
      props.setRef(ref)
    }
  }

  return <div ref={setRef}>{props.message}</div>

}

interface IPropsStateful {
  message: string
}

class SomeClass extends React.Component<IPropsStateful> {

  public static defaultProps: Partial<IPropsStateful> = {
    message: 'Hello World!'
  }

  mode = 'default'

  state = {
    foo: 'bar'
  }

  type: string

  constructor(props) {
    super(props)

    props.setRoot(this)

    this.type = 'derived'
  }

  render() {
    return <div>{this.props.message}</div>
  }

}

function wrapper(tree) {

  return (
    <div>
      <div>
        <div>
          {tree}
        </div>
      </div>
    </div>
  )

}

describe('Stateless', function () {

  it('default', function () {

    const { container, ref, root, unmount } = mount(<StatelessComponent message="No State!" />, { type: 'stateless' })

    expect(getRootTextContent()).to.equal('No State!')

    expect(container.props.message).to.equal('No State!')
    expect(ref).to.equal(undefined)
    expect(root).to.equal(undefined)

    unmount()

    expect(getRootTextContent()).to.equal('')

  })
  
  it('with ref', function () {

    const { container, ref, root, unmount } = mount(<StatelessComponentWithRef message="No State!" />, { type: 'stateless' })

    expect(getRootTextContent()).to.equal('No State!')

    expect(container.props.message).to.equal('No State!')
    expect(ref.textContent).to.equal('No State!')
    expect(root).to.equal(undefined)

    unmount()

    expect(getRootTextContent()).to.equal('')

  })

  it('nested', function () {

    const { container, ref, root, unmount } = mount(<StatelessComponentWithRef message="No State!" />, { type: 'stateless', wrapper })

    expect(getRootTextContent()).to.equal('No State!')

    expect(container.props.message).to.equal('No State!')
    expect(ref.textContent).to.equal('No State!')
    expect(root).to.equal(undefined)

    unmount()

    expect(getRootTextContent()).to.equal('')

  })

})

describe('Stateful', function () {

  it('default', function () {

    const { ref, root, unmount } = mount(<SomeClass />)

    expect(getRootTextContent()).to.equal('Hello World!')

    expect(ref.mode).to.equal('default')
    expect(ref.props.message).to.equal('Hello World!')
    expect(ref.state.foo).to.equal('bar')
    expect(ref.type).to.equal('derived')

    expect(root.mode).to.equal('default')
    expect(root.props.message).to.equal('Hello World!')
    expect(root.state.foo).to.equal('bar')
    expect(root.type).to.equal('derived')

    unmount()

    expect(getRootTextContent()).to.equal('')

  })

  it('nested', function () {

    const { ref, root, unmount } = mount(<SomeClass />, { wrapper })

    expect(getRootTextContent()).to.equal('Hello World!')

    expect(ref.mode).to.equal('default')
    expect(ref.props.message).to.equal('Hello World!')
    expect(ref.state.foo).to.equal('bar')
    expect(ref.type).to.equal('derived')

    expect(root.mode).to.equal('default')
    expect(root.props.message).to.equal('Hello World!')
    expect(root.state.foo).to.equal('bar')
    expect(root.type).to.equal('derived')

    unmount()

    expect(getRootTextContent()).to.equal('')

  })

})
