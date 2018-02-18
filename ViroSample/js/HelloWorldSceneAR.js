'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

import {
  ViroScene,
  ViroText,
  Viro360Image,
  ViroAnimations,
  ViroARScene,
  ViroSurface,
  ViroButton,
  ViroMaterials,
  ViroImage
} from 'react-viro';

var createReactClass = require('create-react-class');

var HelloWorldScene = createReactClass({
  getInitialState() {
    return {
      text : "Cheetos"
    };
  },
  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  },
  render: function() {
    return (
      <ViroARScene onTrackingInitialized={this._onInitialized} onTouch={this._onSceneClick}>

        <ViroText text={this.state.text} scale={[.1, .1, .1]} position={[0.0, 0.06, -1.0]} style={{fontFamily:"Helvetica", fontSize:40, color:"#000000", textAlign: "center"}} opacity={1.0} rotation={[0,-30,0]} visible={true}/>

        <ViroSurface height={0.4} width={0.4} materials={["earth"]} position={[0,0,-1.1]} opacity={0.6} rotation={[0,-30,0]} visible={true}/>
        <ViroImage
          placeholderSource={require("./res/stars.png")}
          source={{uri:"https://my_s3_image.jpg"}}
          position={[0.0,-0.04,-0.95]}
          rotation={[0,-30,0]}
          scale={[.3, .1, .1]}
        />
        <ViroButton
        source={require("./res/button.jpg")}
        hoverSource={require("./res/hovered.jpg")}
        clickSource={require("./res/clicked.jpg")}
        position={[0.0, -0.13, -1.0]}
        rotation={[0, -30, 0]}
        height={0.2}
        width={0.3}
        onTap={this._onButtonTap("buy")}
        onGaze={this._onButtonGaze}
        visible={true} />

        <ViroButton
        source={require("./res/button.jpg")}
        hoverSource={require("./res/hovered.jpg")}
        clickSource={require("./res/clicked.jpg")}
        position={[0.0, -0.13, -1.0]}
        rotation={[0, -30, 0]}
        height={0.2}
        width={0.3}
        onTap={this._onButtonTap("exit")}
        onGaze={this._onButtonGaze("exit")}
        visible={true} />

      </ViroARScene>
    );
  },
  _onButtonTap(ButtonType) {
      if(ButtonType == "buy")
      {
        console.log("buy");
      }
  },
  _onButtonGaze(ButtonType) {
      if(ButtonType == "buy")
      {
        console.log("buy_gaze");
      }
  },
  _onSceneClick(state, touchPos, source){
    if(state == 3)
    {

    }
  }

});
class MyComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
	  <div>Bags of Apples</div>
	  <div>2 Bananas</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
  }
}

const ItemChild = () => (
<div className='modal'>
      Hello, World!
  </div>
)

ViroAnimations.registerAnimations({
  showImage:{properties:{scaleX:1, scaleY:1, scaleZ:1, opacity: 1},
        easing:"EaseOut", duration: 5000}
});

ViroAnimations.registerAnimations({
  dissapearImage:{properties:{scaleX:0, scaleY:0, scaleZ:0, opacity: 0},
        easing:"EaseOut", duration: 1000}
});
ViroMaterials.createMaterials({
  earth: {
     lightingModel: "Constant"
   },
});
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 40,
    color: '#ffffff',
  },
});

module.exports = HelloWorldScene;
