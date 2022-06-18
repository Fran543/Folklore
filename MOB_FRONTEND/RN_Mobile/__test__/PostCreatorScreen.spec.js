// import {default as HomeScreeen} from "../screens/HomeScreen"

// describe('truth', () => {
//     it('is true', () => {
//       expect(true).toEqual(true);
//     });
//   });

import React from 'react';
import renderer from 'react-test-renderer';

import PostCreatorScreen from '../screens/PostCreatorScreen';

describe('<PostCreatorScreen />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<PostCreatorScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('has 2 child', () => {
        const tree = renderer.create(<PostCreatorScreen />).toJSON();
        expect(tree.children.length).toBe(2);
    });
});
