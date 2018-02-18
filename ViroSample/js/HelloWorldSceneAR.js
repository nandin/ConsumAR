'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroSurface,
  ViroText,
  ViroFlexView,
  ViroButton,
  ViroMaterials,
  ViroBox,
} from 'react-viro';
import { SafeAreaView, StackNavigator } from 'react-navigation';

{/*const App = StackNavigator({
  Login: { screen: LoginScreen },
  Orders: { screen: CamScreen },
});*/}

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

        <ViroText text={this.state.text} scale={[.3, .3, .3]} position={[0, 0, -1.0]} style={{fontFamily:"Helvetica", fontSize:30, color:"#000000"}} opacity={1.0} rotation={[0,-30,0]} visible=false/>
        <ViroSurface height={0.4} width={0.4} materials={["earth"]} position={[0,0,-1.1]} opacity={0.6} rotation={[0,-30,0]} visible=false/>
        <ViroButton
            source={require("./res/button.jpg")}
            hoverSource={require("./res/hovered.jpg")}
            clickSource={require("./res/clicked.jpg")}
            position={[0.0, -0.13, -1.0]}
            rotation={[0, -30, 0]}
            height={0.2}
            width={0.3}
            onTap={this._onButtonTap("buy")}
            onGaze={this._onButtonGaze} />
            visible=false
        <ViroButton
            source={require("./res/button.jpg")}
            hoverSource={require("./res/hovered.jpg")}
            clickSource={require("./res/clicked.jpg")}
            position={[0.0, -0.13, -1.0]}
            rotation={[0, -30, 0]}
            height={0.2}
            width={0.3}
            onTap={this._onButtonTap("close")}
            onGaze={this._onButtonGaze} />
            visible=false

      </ViroARScene>
    );
  }

  _onInitialized() {
    this.setState({
      text : ""
    });
  }
  //outside of render method
  _onButtonGaze(objectTag) {
      this.setState({
          buttonStateTag: "onGaze"
      });
  }
  _onButtonTap(objectTag) {
      this.setState({
          buttonStateTag: "onTap"
      });
      if(objectTag == "buy")
      {
        //server call
      }
      if(objectTag == "close")
      {
        
      }
  }
  _onTouch(state, touchPos, source)  {
   var touchX = touchPos[0];
   var touchY = touchPos[1];
    if(state == 1) {
      this.setState({

      })
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
