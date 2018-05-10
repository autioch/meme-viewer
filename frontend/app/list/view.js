import React, { Component } from 'react';
import ItemView from './item/view';

// import './styles.css';

export default class List extends Component {
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
        <div className ="list__toggle" onClick={this.toggle}>{'< >'}</div>
        <div className ="list__content">
          {this.props.list.map((gallery) => <ItemView gallery={gallery} setGallery={this.props.setGallery}/>)}
        </div>
      </div>
    );
  }
}
