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
import { SafeAreaView, StackNavigator } from 'react-navigation';

const App = StackNavigator({
  Login: { screen: LoginScreen },
  Orders: { screen: CamScreen },
});

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



        <ViroFlexView style={{flexDirection: 'column', padding: .1}}
              width={5.0} height={5.0}
              position={[-5.0, 0.0, -2.0]}
              rotation={[0, 30, 0]} >
              <ViroText text={this.state.text} scale={[.3, .3, .3]} position={[0, 0, -2.4]} style={{fontFamily:"Helvetica", fontSize:30, color:"#000000"}} opacity={1.0} rotation={[0,30,0]}/>
              <ViroSurface height={0.4} width={0.4} materials={["earth"]} position={[0,0,-2.5]} opacity={0.6} rotation={[0,30,0]}/>
              <ViroButton
                  source={require("./res/button_base.jpg")}
                  gazeSource={require("./res/button_on_gazing.jpg")}
                  tapSource={require("./res/button_on_tap_pressed.jpg")}
                  position={[1, 3, -5]}
                  rotation={[0, 30, 0]}
                  height={2}
                  width={3}
                  onTap={this._onButtonTap}
                  onGaze={this._onButtonGaze />
        </ViroFlexView>

      </ViroARScene>
    );
  }

  _onInitialized() {
    this.setState({
      text : ""
    });
  }

}
.....
//outside of render method
  _onButtonGaze() {
      this.setState({
          buttonStateTag: "onGaze"
      });
  },
  _onButtonTap() {
      this.setState({
          buttonStateTag: "onTap"
      });
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
