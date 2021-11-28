import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TextInput, Button, Alert} from 'react-native'
import { Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { withFormik } from 'formik';
import { uploadRecipe } from '../API/NewRecipeApi';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/core'



const NewRecipeScreen = (props) => {
    const navigation = useNavigation()
    return (
        <ImageBackground source={require('../assets/cooking.jpeg')} resizeMode="cover" style={styles.backImage}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.text}>
                    Recept:
                </Text>
                <View style={styles.imageButton}>
                    <Button
                        onPress={() => {props.selectImage()}}
                        title="Vyberte Fotku"
                        color="#333"
                    />
                </View>
                <StatusBar style="auto" />
                <TextInput style={styles.addText}
                    value={props.values.name}
                    placeholder="Zadajte názov receptu:"
                    onChangeText={text => { props.setFieldValue('name', text) }}
                    clearButtonMode="always"
                />
                
                <View style={styles.keyText}>
                    <TextInput
                        placeholder="Zadajte časť postupu"
                        onChangeText={text => { props.setSubName(text) }}
                        style={styles.input}
                        clearButtonMode="always"
                    />
                </View>
                <View style={styles.row}>
                    <View style={styles.valueText}> 
                        <TextInput
                            placeholder="Zadajte čas prípravy"
                            onChangeText={number => { props.setSubTime(number) }}
                            keyboardType="numeric"
                            style={styles.input}
                            clearButtonMode="always"
                        />
                    </View>
                    <View style={styles.IngButton}>
                            <Button
                                title="+"
                                color="#333"
                                onPress={() => {props.submitSubNameTime()}}
                            />
                        </View>
                </View>
                
                <View style={styles.keyText}>
                    <TextInput
                        placeholder="Zadajte názov suroviny"
                        value={props.values.ingName}
                        onChangeText={text => {props.ingNameChange(text)}}
                        style={styles.input}
                        clearButtonMode="always"
                    />
                </View>
                <View style={styles.row}>
                    <View style={styles.valueText}> 
                        <TextInput
                            placeholder="Zadajte množstvo suroviny"
                            value={props.values.ingCount}
                            onChangeText={text => {props.ingCountChange(text)}}
                            style={styles.input}
                            clearButtonMode="always"
                        />
                    </View>
                    <View style={styles.IngButton}>
                            <Button
                                title="+"
                                color="#333"
                                onPress={() => {props.ingNameCountAdd()}}
                            />
                        </View>
                </View>
                <Text style={{fontSize: 20}}>Ingrediencie</Text>
                <ScrollView>
                    {
                    Object.entries(props.ingredients).map(([key, value]) => {
                        return(
                            <View style={styles.itemsview}>
                            <View style={styles.item}><Text style={styles.ingredient}>{key}</Text></View>
                            <View style={styles.item}><Text style={styles.ingredient}>{value}</Text></View>
                            </View>
                            )
                    })
                    
                }
                </ScrollView>
                <TextInput style={styles.tutorialText}
                    placeholder="Zadajte čas :"
                    onChangeText={text => { props.setFieldValue('time', text) }}
                    clearButtonMode="always"
                />
            </View>
            <View style={styles.addButton}>
                    <Button
                        title="PRIDAŤ"
                        color="#333"
                        onPress={() => {
                            props.handleSubmit(),
                            navigation.navigate('Homepage')
                            }}
                    />
                </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backImage: {
        flex: 1
    },
    text: {
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'Optima',
        fontWeight: 'bold',
        color: '#333',
        top: Dimensions.get('window').height / 14,
        right: 100
    },
    addText: {
        color: 'black',
        fontSize: 25,
        margin: 45,
        padding: 5,
        borderWidth: 0.5,
        width: 270
    },
    addButton: {
        left: 27, 
        bottom: 40, 
        position: 'absolute',
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#333',
        overflow: 'hidden',
        width: 90,
        textAlign: 'center',
        backgroundColor: '#edbf46'
    },
    imageButton: {
        left: Dimensions.get('window').width / 7,
        borderWidth: 0.5,
        borderRadius: 7,
        borderColor: '#333',
        overflow: 'hidden',
        textAlign: 'center',
        backgroundColor: '#9ec887',
        marginTop: 10
    },
    row: {
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    inputText: {
        borderColor: '#333',
        borderWidth: 0.5,
        padding: 5,
        height: 40,
        width: '75%',
        marginBottom: 16,
        marginTop: 16,
        fontSize: 25,
        textAlign: 'center'
    },
    IngButton: {
        borderWidth: 1,
        borderRadius: 7,
        overflow: 'hidden',
        textAlign: 'center',
        backgroundColor: '#2196f3',
        width: 40,
        right: 20,
    },
    tutorialText: {
        fontSize: 25,
        color: 'black',
        marginBottom: 130,
        right: 80,
        borderWidth: 0.5,
        padding: 5,
        marginTop: 10,
        width: 150
    },
    keyText: {
        color: 'black',
        padding: 5,
        marginTop: 15,
        borderWidth: 0.5,
        width: 200,
        marginBottom: 20,
    },
    valueText: {
        color: 'black',
        padding: 5,
        borderWidth: 0.5,
        width: 200,
        left: 87
    },
    itemsview:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    item:{
        width:"50%",
        alignItems: "center"
    },
    ingredient:{
        color:"black",
        fontSize:20
    }
})

export default withFormik({
    mapPropsToValues: ({ food }) => ({
      name: food.name,
      time: food.time,
      rate: food.rate,
      rate_count: food.rate_count
    }),
    enableReinitialize: true,
    validationSchema: (props) => yup.object().shape({
        name: yup.string().max(30).required(),
        time: yup.string().max(15).required()
  }),
  handleSubmit: (values, { props }) => {
      console.log(props);
      values.image = props.imageGet
      values.ingredient = props.ingredients;
      values.instructions = props.food.instrName;
      values.instructions_time = props.food.instrTime;
      console.log('VALUES:' , values);
      uploadRecipe(values)
      Alert.alert('Upozornenie', 'Recept bol pridaný.', [
        {text: 'Rozumiem', onPress: () => console.log('send alert closed')}
    ])
    },
})(NewRecipeScreen);
