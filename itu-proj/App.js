/**
 * Author: Slavomir Svorada (xsvora02)
 * This file is used for checking for first time loading 
 */
import React, { useEffect, useState } from 'react';
import { AppRegistry, View } from 'react-native';
import Routes from './Routes.js'
import Welcome from './Screens/Welcome';
//import AsyncStorage for checking for first loading
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
   const [loading, setLoading] = useState(true);
   const [firstTimeLoad, setFirstTimeLoad] =useState(false);

   // checking and setting if we load first time or not
   const checkFirstTimeLoaded = async () => {
      const result = await AsyncStorage.getItem('isFirstTimeOpen');
      if (result === null) setFirstTimeLoad(true);
      setLoading(false);
      }
      useEffect(() => {
      checkFirstTimeLoaded()
   }, [])

   // setting titles, descriptions and pictures on onboarding screen
  const slides = [
      {
      key: 1,
         title: 'Vitajte v aplikácií Kuchárka',
         //desc: 'Popis prveho slajdu',
         backgroundColor: '#fbfbfb',
         image: require('./assets/kucharka.gif')
      },
      {
         key: 2,
         title: 'Ďakujeme Vám za používanie našej aplikácie',
         //desc: 'Popis druheho slajdu',
         backgroundColor: '#f5bbba',
         image: require('./assets/kucharka2.gif')
      },
      {
         key: 3,
         title: 'Začnime',
         //desc: 'Popis tretieho slajdu',
         backgroundColor: '#e1edc9',
         image: require('./assets/kucharka3.gif')
      }
   ];

   // when we click on Done button on onboarding screen
  const buttonDone = () => {
      setFirstTimeLoad(false);
      AsyncStorage.setItem('isFirstTimeOpen', 'no')
   };

   if (loading) return null

   if(firstTimeLoad){
      return (
         <>
         <Welcome weDone={buttonDone} slides={slides}/>
         </>
      )
   }  else {
      return (
         <Routes />
      )
   }

   
  
}
AppRegistry.registerComponent('App', () => reactTutorialApp)