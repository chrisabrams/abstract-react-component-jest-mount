import React from 'react'
import { expect } from 'test/helpers'
import mount from '../../src/index'

function getRootTextContent () {
  return document.getElementById('root').textContent
}

interface IPropsStateless {
  defaultValue: string
}

type TRefStatelessInput = HTMLInputElement
const StatelessInput = React.forwardRef<TRefStatelessInput, IPropsStateless>((props: IPropsStateless, ref) => (
  <input ref={ref} {...props} />
))

const StatelessInputNested = React.forwardRef<TRefStatelessInput, IPropsStateless>((props: IPropsStateless, ref) => (
  <div><input ref={ref} {...props} /></div>
))

interface IPropsStateful {
  defaultValue: string
  ref: any
  setRoot?: any
}

class StatefulInput extends React.Component<IPropsStateful> {

  public static defaultProps: Partial<IPropsStateful> = {
    defaultValue: 'Hello World!'
  }

  mode = 'default'
  _props: IPropsStateful

  state = {
    foo: 'bar'
  }

  type: string

  constructor(props) {

    super(props)

    props.setRoot(this)

    this._props = {
      ...props
    }
    delete this._props.setRoot

    this.type = 'derived'
  }

  render() {
    return <input ref={this.props.ref} {...this._props} />
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

    const ref = React.createRef<TRefStatelessInput>()
    const { container, root, unmount } = mount(<StatelessInput ref={ref} defaultValue="No State!" />, { type: 'stateless' })

    expect(container.props.defaultValue).to.equal('No State!')
    expect(ref.current.value).to.equal('No State!')
    expect(root).to.equal(undefined)

    unmount()

    expect(getRootTextContent()).to.equal('')

  })

  it('nested', function () {

    const ref = React.createRef<TRefStatelessInput>()
    const { container, root, unmount } = mount(<StatelessInputNested ref={ref} defaultValue="No State!" />, { type: 'stateless' })

    expect(container.props.defaultValue).to.equal('No State!')
    expect(ref.current.value).to.equal('No State!')
    expect(root).to.equal(undefined)

    unmount()

    expect(getRootTextContent()).to.equal('')

  })

})

describe('Stateful', function () {

  it('default', function () {

    const { ref, root, unmount } = mount(<StatefulInput />)

    expect(ref.current.props.defaultValue).to.equal('Hello World!')

    expect(root.mode).to.equal('default')
    expect(root.props.defaultValue).to.equal('Hello World!')
    expect(root.state.foo).to.equal('bar')
    expect(root.type).to.equal('derived')

    unmount()

    expect(getRootTextContent()).to.equal('')

  })

  it('nested', function () {

    const { ref, root, unmount } = mount(<StatefulInput />, { wrapper })

    expect(ref.current.props.defaultValue).to.equal('Hello World!')

    expect(root.mode).to.equal('default')
    expect(root.props.defaultValue).to.equal('Hello World!')
    expect(root.state.foo).to.equal('bar')
    expect(root.type).to.equal('derived')

    unmount()

    expect(getRootTextContent()).to.equal('')

  })

})
