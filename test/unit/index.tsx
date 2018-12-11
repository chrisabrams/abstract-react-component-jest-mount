import AbstractReactClass from '../../src/index'
import React from 'react'
import { expect } from 'test/helpers'
import mount from '../../src/index'

interface IProps {
  message: string
}

class SomeClass extends React.Component<IProps> {

  public static defaultProps: Partial<IProps> = {
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

describe('Mount', function () {

  it('should mount and unmount component', function () {

    const { ref, root, unmount } = mount(<SomeClass />)

    expect(document.getElementById('root').textContent).to.equal('Hello World!')

    expect(ref.mode).to.equal('default')
    expect(ref.props.message).to.equal('Hello World!')
    expect(ref.state.foo).to.equal('bar')
    expect(ref.type).to.equal('derived')

    expect(root.mode).to.equal('default')
    expect(root.props.message).to.equal('Hello World!')
    expect(root.state.foo).to.equal('bar')
    expect(root.type).to.equal('derived')

    unmount()

    expect(document.getElementById('root').textContent).to.equal('')

  })

  describe('Nested Component', function () {

    it('should get ref and root', function() {

      const { ref, root, unmount } = mount(<SomeClass />, { wrapper })

      expect(document.getElementById('root').textContent).to.equal('Hello World!')

      expect(ref.mode).to.equal('default')
      expect(ref.props.message).to.equal('Hello World!')
      expect(ref.state.foo).to.equal('bar')
      expect(ref.type).to.equal('derived')

      expect(root.mode).to.equal('default')
      expect(root.props.message).to.equal('Hello World!')
      expect(root.state.foo).to.equal('bar')
      expect(root.type).to.equal('derived')

      unmount()

      expect(document.getElementById('root').textContent).to.equal('')

    })

  })

})
