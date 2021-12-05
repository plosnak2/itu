/**
 * Author: Jozef Čásar (xcasar)
 * This is logical and graphic component that displays the instruction based on timer to user
 */
import React, { Component } from 'react'
import { Image, Text, ScrollView, View, StyleSheet, Dimensions, FlatList, KeyboardAvoidingView, TouchableOpacity, Vibration, ImageBackground, Button } from 'react-native'

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            seconds: 3,
            time: this.props.route.params['time'],
            instructions: this.props.route.params['instructions'],
            act_instruction: '',
            act_index: 0,
            interval: null,
            backgroundColor: ['green', 'yellow', '#e8d876', '#dbf5ff', '#ffec97'],
            flag: true,
            vibration: null
        };
    }

    //changing timer
    tick = () => {
        if (this.state.seconds > 0) {
            this.setState({flag: true})
            this.setState(state => ({
                seconds: state.seconds - 1
            }));
        }
        else {
            if (this.state.act_index == this.state.time.length - 1) {
                this.componentWillUnmount
                this.props.navigation.navigate('Home')
                this.setState({ interval: clearInterval(() => this.tick()) })
            }
            else if(this.state.flag){
                Vibration.vibrate()
            }
        }
    }

    //set timer and data to state
    componentDidMount() {
        this.setState({ act_instruction: this.state.instructions[0] })
        this.setState({seconds: this.state.time[0]})
        let timer = setInterval(this.tick, 1000);
        this.setState({ timer });

    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    //change time to user friendly variant
    formatTime(secs) {
        let hours = Math.floor(secs / 3600);
        let minutes = Math.floor(secs / 60) % 60;
        let seconds = secs % 60;
        return [hours, minutes, seconds]
            .map(v => ('' + v).padStart(2, '0'))
            .filter((v, i) => v !== '00' || i > 0)
            .join(':');
    }

    //change actual instruction to next
    nextInstruction() {
        this.setState({ seconds: this.state.time[this.state.act_index+1] })
        this.setState({ act_instruction: this.state.instructions[this.state.act_index+1] })
        this.setState({ act_index: this.state.act_index + 1 })
        Vibration.cancel()
    }

    //display actual instruction, timer and gif
    render() {
        return (
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor:
                        this.state.backgroundColor[this.state.act_index % 5],
                }}
            >
                <TouchableOpacity onPress={() => this.setState({flag: false})}>
                <View style={{ paddingHorizontal: 20, flexDirection: 'row', marginTop: 20 }}>
                    <Text style={{ fontSize: 30, paddingRight: 50 }}>
                        Časovač: {this.formatTime(this.state.seconds)}
                    </Text>
                    {
                        this.state.act_index != this.state.time.length - 1 && <TouchableOpacity style={styles.wrapper} onPress={() => this.nextInstruction()}>
                            <Text style={styles.wrapperedtext}>Ďalej</Text>
                        </TouchableOpacity>
                    }
                    {
                        this.state.act_index == this.state.time.length - 1 && <TouchableOpacity style={styles.wrapper} onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={styles.wrapperedtext}>Koniec</Text>
                        </TouchableOpacity>
                    }
                    
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 30 }}>Postup:</Text>
                    <Text style={{ fontSize: 20 }}>{this.state.act_instruction}</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    {this.state.act_index % 5 == 0 && (
                        <Image
                            style={styles.image}
                            source={require("../assets/cooking1.gif")}
                        />
                    )}
                    {this.state.act_index % 5 == 1 && (
                        <Image
                            style={styles.image}
                            source={require("../assets/cooking2.gif")}
                        />
                    )}
                    {this.state.act_index % 5 == 2 && (
                        <Image
                            style={styles.image}
                            source={require("../assets/cooking3.gif")}
                        />
                    )}
                    {this.state.act_index % 5 == 3 && (
                        <Image
                            style={styles.image}
                            source={require("../assets/cooking4.gif")}
                        />
                    )}
                    {this.state.act_index % 5 == 4 && (
                        <Image
                            style={styles.image}
                            source={require("../assets/cooking5.gif")}
                        />
                    )}
                </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}
export default Timer

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get("window").width / 2,
        height: Dimensions.get("window").height / 4,
        resizeMode: "stretch",
        alignSelf: "center",
        marginTop: Dimensions.get("window").height / 3,
    },
    wrapper: {
        backgroundColor: '#0782F9',
        borderRadius: 100,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    wrapperedtext: {
        color: 'white',
        fontSize: 25,
    },
})