import React from 'react';
import $ from 'jquery';
import './stories.css';

var getStoriesEndPoint = "http://127.0.0.1:8091/getStories"


class Stories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    showPost(id) {
        alert(id);
    }

    toggleStars(id) {
        $('#star-rating' + id).toggle("slow");
        alert(id);
    }

    toggleComments(id) {
        $('#comment-rating' + id).toggle("slow");
        alert(id);
    }

    componentDidMount() {
        fetch(getStoriesEndPoint)
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
            return <div>Loading Stories...</div>;
        } else {
            return (
                <div className="postContainer">
                    <div className="card-columns cardGrid">
                        {items.map((item, index) => (
                            <div className='card' key={item.IDStory} onClick={() => this.showPost(item.IDStory)}>
                                <img className='card-img-top' src={item.ImageBlob} alt='Card image cap' />
                                <div className='card-body'>
                                    <h5 className='card-title'> {item.StoryName}</h5>
                                    <p className='warnings'>
                                    </p>
                                    <p className='card-text'>{item.Summary}</p>
                                    <p className='card-text'>
                                        <small className='text-muted'>
                                            <i className='fas fa-star star' onClick={() => this.toggleStars(item.IDStory)}></i>1000
                                            <i className='far fa-user'></i>admin
                                            <i className='fas fa-calendar-alt'></i>{new Date(item.PubDate).toDateString()}
                                            <i className='fas fa-comment comment' onClick={() => this.toggleComments(item.IDStory)}></i> 4 comments
                                        </small>
                                    </p>
                                    <div className='star-rating' id={item.IDStory}>
                                        <input id='star-5' type='radio' name='rating' value='star-5' />
                                        <label htmlFor='star-5' title='5 stars'>
                                            <i className='active fa fa-star' aria-hidden='true'></i>
                                        </label>
                                        <input id='star-4' type='radio' name='rating' value='star-4' />
                                        <label htmlFor='star-4' title='4 stars'>
                                            <i className='active fa fa-star' aria-hidden='true'></i>
                                        </label>
                                        <input id='star-3' type='radio' name='rating' value='star-3' />
                                        <label htmlFor='star-3' title='3 stars'>
                                            <i className='active fa fa-star' aria-hidden='true'></i>
                                        </label>
                                        <input id='star-2' type='radio' name='rating' value='star-2' />
                                        <label htmlFor='star-2' title='2 stars'>
                                            <i className='active fa fa-star' aria-hidden='true'></i>
                                        </label>
                                        <input id='star-1' type='radio' name='rating' value='star-1' />
                                        <label htmlFor='star-1' title='1 star'>
                                            <i className='active fa fa-star' aria-hidden='true'></i>
                                        </label>
                                    </div>
                                    <section className='mt-5 comments' id={item.IDStory}>
                                        <div className='container'>
                                            <div className='row'>
                                                <div className='col-sm-12'>
                                                    <form>
                                                        <p className='pull-left'>Add new Comment</p>
                                                        <textarea className='form-control' id='message' placeholder='Your message...' required='' maxLength='250'></textarea>
                                                        <button type='submit' className='btn btn-normal btnSubmit'>Submit</button>
                                                    </form>
                                                    <hr />
                                                    <p>Comments</p>
                                                    <div className='media'>
                                                        <h4>John Doe</h4>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    }
}

export default Stories;