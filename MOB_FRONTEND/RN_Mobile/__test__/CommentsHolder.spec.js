import React from 'react';
import renderer from 'react-test-renderer';

import CommentsHolder from '../components/home/CommentsHolder';

describe('<CommentsHolder />', () => {

    it('renders correctly', async () => {
        const tree = await renderer.create(<CommentsHolder idStory="1" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('has 1 child', async () => {
        const tree = await renderer.create(<CommentsHolder idStory="1"/>).toJSON();
        expect(tree.children.length).toBe(1);
    });
});
