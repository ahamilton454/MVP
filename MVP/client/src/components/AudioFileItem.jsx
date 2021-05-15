import React from 'react';

class AudioFileItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href={this.props.link}>{this.props.fname}</a>
    )
  }
}

export default AudioFileItem;