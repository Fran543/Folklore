import React from 'react';
import renderer from 'react-test-renderer';

import CommentSection from '../components/home/CommentSection';

describe('<CommentSection />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<CommentSection idStory="1"/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('has 3 child', () => {
        const tree = renderer.create(<CommentSection idStory="1"/>).toJSON();
        expect(tree.children.length).toBe(3);
    });
});
