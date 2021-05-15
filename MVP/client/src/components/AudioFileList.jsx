import React from 'react';
import AudioFileItem from './AudioFileItem.jsx'

class AudioFileList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log("AudioFileList: ", this.props.list)
    if (this.props.list.length) {
      return (<div>{this.props.list.map(item => {
        this.props.getLink(item)
          .then((fileURL) => {
            console.log("AudioFileList URL:", fileURL);
            return <AudioFileItem link={fileURL} fname={item}/>
          })
          return <div><AudioFileItem link={"https://audiofile-holder.s3.us-east-2.amazonaws.com/0background16.wav"} fname={item}/></div>

      })}


        </div>)
    } else {
      return (<h2>Upload Files, your directory is empty</h2>);
    }
  }
}

export default AudioFileList;