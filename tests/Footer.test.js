import 'react-native';
import React from 'react';
import Footer from '../src/components/Footer';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Footer />).toJSON();
  expect(tree).toMatchSnapshot();
});
