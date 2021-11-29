import React from 'react'
import { ActivityIndicator, Alert, Platform, LogBox } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import NewRecipeScreen from '../Components/NewRecipeScreen';
import { storage } from '../firebaseConfig';

LogBox.ignoreLogs(['Setting a timer']);

if (Platform.OS === 'android') {
    if (!ActivityIndicator.defaultProps) ActivityIndicator.defaultProps = {};
    ActivityIndicator.defaultProps.color = 'gray';
}

/*
TODO image:, ingredient, instructions:, name:, time:
*/

export default class newRecipe extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            ingredients: {},
            food: {
                name: '',
                //instructions: '',
                time: '',
                subIng: [],
                instrName: [],
                instrTime: [],
                ingName: '',
                ingCount: '',
                rate: 0,
                rate_count: 0,
                //tutorialInfo: '',
                //timeInfo: ''
            },
            currentSubIng: null,
            currInstrName: null,
            currInstrTime: 0,
            selectedPictureUri: '',
            finalURL: '',
            imagePath: ''
            
        }
        this.ingNameChange = this.ingNameChange.bind(this);
        this.ingCountChange = this.ingCountChange.bind(this);
        //this.submitSubNameTime = this.submitSubNameTime.bind(this);
    }

    selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.didCancel) {
            console.log('User cancelled image picker');
          } else if (result.error) {
            console.log('ImagePicker Error: ', result.error);
          } else {
            const uri = result.uri;

            this.setState({
              selectedPictureUri: uri,
            });

            let path = this.getPlatformPath(result).value;
            let fileName = this.getFileName(result.fileName, path);
            this.setState({ imagePath: path });
            this.uploadImageToStorage(path, fileName);        
          }
          
    };
    getPlatformPath({ uri }) {
        return Platform.select({
            android: { "value": uri },
            ios: { "value": uri }
        })
    }
    getFileName(name, path) {
        if (name != null) { return name; }
        return path.split("/").pop();
    }
    async uploadImageToStorage(path, name) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', this.state.selectedPictureUri, true);
            xhr.send(null);
        });


        this.setState({ isLoading: true });
        let reference = storage.ref().child(name);
        const snapshot = await reference.put(blob);
        const imageurl = await snapshot.ref.getDownloadURL();
        this.setState({
            finalURL: imageurl,
          });
        blob.close();

    }

    setCurSubIng = (text) => {
        this.setState(prevState => ({
            currentSubIng: prevState.currentSubIng = text
        }));
    }
    setCurName = (text) => {
        this.setState(prevState => ({
            currInstrName: prevState.currInstrName = text
        }));
    }
    setCurTime = (number) => {
        this.setState(prevState => ({
            currInstrTime: prevState.currInstrTime = number
        }));
    }

    submitSubIng = () => {
        let ingredient = this.state.currentSubIng;

        if (ingredient && ingredient.length > 2) {
            this.setState(prevState => ({
                food: { ...prevState.food,
                    subIng: [...prevState.food.subIng, ingredient] },
            }))
        } else {
            Alert.alert('Upozornenie', 'Dĺžka názvu ingrediencie musí byť väčšia ako 2 znaky.', [
                {text: 'Rozumiem', onPress: () => console.log('ingredient alert closed')}
            ])
        }
    }
    
    submitSubNameTime = () => {
        let ingredient = this.state.currInstrName;
        let ingredient2 = this.state.currInstrTime;

            if ((ingredient && ingredient.length > 2) && ((ingredient2 && ingredient2.length < 4) && (ingredient2.length > 0))) {
                this.setState(prevState => ({
                    food: { ...prevState.food,
                        instrName: [...prevState.food.instrName, ingredient] },
                }));
                this.setState(prevState => ({
                    food: { ...prevState.food,
                        instrTime: [...prevState.food.instrTime, ingredient2] },
                }));
                this.setState({
                    currInstrName: '',
                });
                this.setState({
                    currInstrTime: '',
                });
                
            } else if (ingredient && ingredient.length < 3) {
                Alert.alert('Upozornenie', 'Dĺžka postupu musí byť väčšia ako 2 znaky.', [
                    {text: 'Rozumiem', onPress: () => console.log('ingredient alert closed')}
                ]);
            } else {
                Alert.alert('Upozornenie', 'Dĺžka času prípravy musí byť najviac trojciferná hodnota.', [
                    {text: 'Rozumiem', onPress: () => console.log('ingredient alert closed')}
                ]);
            }
        }

    ingNameChange = (text) => {
        this.setState({ingName: text})
    }

    ingCountChange = (text) => {
        this.setState({ingCount: text})
    }

    ingNameCountAdd = () => {
        if(this.state.ingName == '' || this.state.ingCount == '') {
            Alert.alert('Upozornenie', 'Pre pridanie suroviny je potrebné zadať názov aj množstvo.', [
                {text: 'Rozumiem', onPress: () => console.log('add ingredient alert closed')}
            ])
        } else {
            const ingArr = this.state.ingredients;
            ingArr[this.state.ingName] = this.state.ingCount
            console.log('ingARR: ', ingArr);
            this.setState({
                ingredients: ingArr
            });
            this.setState({
                ingName: ''
            });
            this.setState({
                ingCount: ''
            });
            
        }
    }

    render() {
        return (
            <NewRecipeScreen
                setSubIng={this.setCurSubIng}
                setSubName={this.setCurName}
                setSubTime={this.setCurTime}
                submitSubIng={this.submitSubIng}
                submitSubName={this.submitSubName}
                submitSubTime={this.submitSubTime}
                submitSubNameTime={this.submitSubNameTime}
                selectImage={this.selectImage}
                sendData={this.sendData}
                food={this.state.food}
                imageGet={this.state.finalURL}
                ingredients={this.state.ingredients}
                ingNameChange={this.ingNameChange}
                ingCountChange={this.ingCountChange}
                ingNameCountAdd={this.ingNameCountAdd}
                ingName={this.state.ingName}
                ingCount={this.state.ingCount}
                currInstrName= {this.state.currInstrName}
                currInstrTime={this.state.currInstrTime}
            />
        );
    }

}
