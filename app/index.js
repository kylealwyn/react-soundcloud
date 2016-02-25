require('./styles/global.scss')

let React = require('react');
let ReactDOM = require('react-dom');
let request = require('./utils/request');


class HelloWorld extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Hello James'
    };

    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidMount() {
    // console.log(new Request('get', this.props.src))
    request('get', this.props.source).then((results) => {
      console.log(results.body);
    }).catch((err) => {
      console.log(err);
    });
    // this.fetchTracks();
  }

  componentWillUnmount() {
    this.request.abort();
  }

  fetchTracks() {
    this.request = request
      .get(this.props.source)
      .accept('application/json')
      .end((err, {body}) => {
        console.log(body);
      });
  }

  buttonClick() {
    console.log(this);
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.message}
        </h1>
        <button className="btn btn-primary" onClick={this.buttonClick}>Hello!!</button>
      </div>
    )
  }
}

ReactDOM.render(<HelloWorld source="https://api.soundcloud.com/tracks?client_id=dae9fa6b8d2421d9992b9d6ff0332134&limit=4" />, document.getElementById('app'));
