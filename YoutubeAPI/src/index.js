import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = "AIzaSyAHQM7BX_k7U68gsHDXzXMe0N4C3KLW3ho";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedVideo: null
            , videos: []
        };

        this.videoSearch('Muse');
    }

    videoSearch(term) {

        YTSearch({ key: API_KEY, term: term }, (data) => {
            this.setState({
                selectedVideo: data[0]
                , videos: data
            });
        });

    }

    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={ videoSearch } />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));