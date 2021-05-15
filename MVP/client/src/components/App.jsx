import React from 'react';
import AudioFileList from './AudioFileList.jsx'
import $ from "jquery";


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            fnames:[]
        }
    }

    postFile() {
        var formElement = document.forms[0];
        console.log(formElement);
        var formData = new FormData(formElement);

        jQuery.ajax("http://localhost:3000/uploads", {
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,
            success: (data) => {
                console.log(data);
            }
        });

    }

    getFileNames() {
        jQuery.ajax("http://localhost:3000/uploads", {
            type: "GET",
            success: (data) => {
                this.setState({fnames: data});
            }
        });
    }

    getFileLink(filename) {
        return new Promise((res, rej) => {
            jQuery.ajax("http://localhost:3000/file", {
                type: "GET",
                data: {fname: filename},
                success: (data) => {
                    console.log("GetFile Data: ", data);
                    res(data);
                }
            });
        })
    }

    componentDidMount() {
        this.getFileNames();
    }

    render() {

        return (
            <div>
                <h1>Audio Denoiser</h1>
                <AudioFileList getLink={this.getFileLink} list={this.state.fnames}/>
                <form enctype="multipart/form-data" >
                    <input type="file" name="audiofile"></input>
                </form>
                <button onClick={() => {this.postFile(); this.getFileNames(); console.log(this.state.fnames)}}>Upload</button>
            </div>
        )
    }
}