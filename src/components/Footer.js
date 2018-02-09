import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        borderWidth: 0,
        flex: 0.2
      }}
    >
      <Text>Done with React Native.</Text>
    </View>
  );
};

export default Footer;
