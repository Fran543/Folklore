import React from 'react';
import { gsap } from "gsap";
import './trending_stories.css';

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
    }

    animation() {
        // CSSPlugin.defaultTransformPerspective = 400;
        gsap.to(".trendingTitle", { duration: 3, repeat: -1, rotationX: 360 });

        gsap.to(".trendingCard", {
            duration: 20,
            ease: "none",
            x: "+=500", //move each box 500px to right
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % 500) //force x value to be between 0 and 500 using modulus
            },
            repeat: -1
        });
    }


    componentDidMount() {
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
                </fieldset >
            );
        }
    }
}

export default TrendingStories;