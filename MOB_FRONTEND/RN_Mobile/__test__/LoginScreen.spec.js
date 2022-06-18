
import React from 'react';
import renderer from 'react-test-renderer';

import LoginScreen from '../screens/LoginScreen';

describe('<LoginScreen />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<LoginScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('has 2 child', () => {
        const tree = renderer.create(<LoginScreen />).toJSON();
        expect(tree.children.length).toBe(2);
    });
});