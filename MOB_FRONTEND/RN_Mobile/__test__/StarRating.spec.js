import React from 'react';
import renderer from 'react-test-renderer';

import StarsRating from '../components/home/StarsRating';

describe('<StarsRating />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<StarsRating idStory="1"/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('has 1 child', () => {
        const tree = renderer.create(<StarsRating idStory="1"/>).toJSON();
        expect(tree.children.length).toBe(1);
    });
});
