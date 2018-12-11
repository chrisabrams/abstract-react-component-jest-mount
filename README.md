# Abstract React Component Jest Mount
Mount Abstract React Components for Jest Testing

## Usage

    yarn add abstract-react-component-jest-mount --dev

```
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

const { ref, root, unmount } = mount(<SomeClass />)
```

- `ref` The React reference to the component mounted.
- `root` The `this` scope to the component mounted.
- `unmount` Clean up the component from the DOM. Required if multiple tests use mount.
