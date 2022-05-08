import React from 'react';
import { default as StoryCard } from '../StoryCard/story_card';

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

    componentDidMount() {
        import('./stories.css');

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
                            <StoryCard story={item} key={item.IDStory} />
                        ))}
                    </div>
                </div>
            );
        }
    }
}

export default Stories;