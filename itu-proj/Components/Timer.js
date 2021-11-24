import React, { Component } from 'react'
import { Image, Text, View, StyleSheet, Dimensions, FlatList, KeyboardAvoidingView,TouchableOpacity } from 'react-native'

class Timer extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          seconds: 3,
          time: this.props.time,
          instructions: this.props.instructions,
          act_instruction: '',
          act_index: 0,
          interval: null
     };
    }
  
    tick =() => {
        if(this.state.seconds > 0){
      this.setState(state => ({
        seconds: state.seconds - 1
      }));}
        else {
            if(this.state.act_index == this.state.time.length - 1){
                this.componentWillUnmount
                this.props.navigation.navigate('Home')
                this.setState({interval: clearInterval(() => this.tick())})
            }
            else{
            console.log('tu')
            this.setState({act_index: this.state.act_index+1})
            this.setState({seconds: this.state.time[this.state.act_index]})
            this.setState({act_instruction: this.state.instructions[this.state.act_index]})
            }
        }
    }
  
    componentDidMount() {
            this.setState({act_instruction: this.state.instructions[this.state.act_index]})
            this.setState({interval : setInterval(() => this.tick(), 1000)});
      
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    formatTime(secs) {
        let hours   = Math.floor(secs / 3600);
        let minutes = Math.floor(secs / 60) % 60;
        let seconds = secs % 60;
        return [hours, minutes, seconds]
            .map(v => ('' + v).padStart(2, '0'))
            .filter((v,i) => v !== '00' || i > 0)
            .join(':');
      }
  
    render(a) {
      return (
          <TouchableOpacity onPress={ this.props.navigateToHome }>
        <Text>
          Čas: {this.formatTime(this.state.seconds)}       {this.state.act_instruction}
        </Text>
        </TouchableOpacity>
      );
    }
  }
   export default Timer