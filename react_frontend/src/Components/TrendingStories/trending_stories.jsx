import React from 'react';
import { Helmet } from "react-helmet";
import { default as StoryCard } from '../StoryCard/story_card';


var getUserEndPoint = "http://127.0.0.1:8091/getUser"


var getTrendingStoriesEndPoint = "http://127.0.0.1:8091/getTrendingStories"

class TrendingStories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    showPost(id) {
        alert(id)
        fetch(getUserEndPoint, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error)

                }
            )
    }

    componentDidMount() {
        import('./trending_stories.css');

        fetch(getTrendingStoriesEndPoint)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading Trending Stories...</div>;
        } else {
            return (
                <fieldset className="trendingContainer">
                    <legend className="trendingTitle">Top 10 trending this week</legend>
                    <div className="postHolder" id="postHolder">

                        {items.map((item, index) => (
                            // <StoryCard story={item} />
                            <div className='story_card trendingCard' id='cardGlow' key={index}>
                                <div className='info_section' onClick={() => this.showPost(item.IDStory)}>
                                    <div className='row'>
                                        <div className='col-12 d-md-none'>
                                            <img src={item.ImageBlob} alt='image' className='img-fluid' />
                                        </div>
                                        <div className='col-12 col-md-6 text-center'>
                                            <h1> {item.StoryName} </h1>
                                            <div className='warnings'>
                                                <button type='button' className='btn btn-success disabled' disabled>Success</button>
                                                <button type='button' className='btn btn-info disabled' disabled>Info</button>
                                                <button type='button' className='btn btn-warning disabled' disabled>Warning</button>
                                                <button type='button' className='btn btn-danger disabled' disabled>Danger</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='story_desc'>
                                        <p className='text'> {item.Summary} </p>
                                    </div>
                                    <div className='story_social'>
                                        <ul>
                                            <li><i className='material-icons-outlined'><span className='material-icons'>share</span></i></li>
                                            <li><i className='material-icons-outlined'><span className='material-icons'>favorite_border</span></i></li>
                                            <li><i className='material-icons-outlined'><span className='material-icons' > chat_bubble_outline</span ></i ></li>
                                        </ul>
                                    </div>
                                    <div className='blur_back card_back'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Helmet>
                        <script src=
                            ".\trendingStory.js" />
                    </Helmet>
                </fieldset >
            );
        }
    }
}

export default TrendingStories;