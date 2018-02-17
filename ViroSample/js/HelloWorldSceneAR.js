'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroSurface,
  ViroText,
  ViroMaterials,
  ViroBox,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingInitialized={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.2, .2, .2]} position={[0, 0, -2.4]} style={{fontFamily:"Helvetica", fontSize:30, color:"#000000"}} opacity={1.0}/>
        <ViroSurface height={0.5} width={0.5} materials={["earth"]} position={[0,0,-2.5]} opacity={0.6}/>

      </ViroARScene>
    );
  }

  _onInitialized() {
    this.setState({
      text : ""
    });
  }

}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
ViroMaterials.createMaterials({
  earth: {
    shininess: 2.0,
    lightingModel: "Constant",
  }
});

module.exports = HelloWorldSceneAR;
