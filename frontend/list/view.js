const { h, Component } = require('preact');
const ItemView = require('./item/view');

require('./styles');

module.exports = class List extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      expanded: true
    };
  }

  toggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    return (
      <div className={`list${this.state.expanded ? ' is-expanded' : ''}`}>
        <div className ="list__toggle" onclick={this.toggle}>{'< >'}</div>
        <div className ="list__content">
          {this.props.list.map((gallery) => <ItemView gallery={gallery} setGallery={this.props.setGallery}/>)}
        </div>
      </div>
    );
  }
};
