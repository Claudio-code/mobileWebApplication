import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image, AsyncStorage, ScrollView } from 'react-native';

import SpotList from '../components/SpotList';
import logo from '../../assets/logo.png';
export default function List() {
    const [techs, settechs] = useState([]);
    useEffect(()=>{
        AsyncStorage.getItem('techs').then(StorageTechs => {
            const techsArray = StorageTechs.split(',').map(tech => tech.trim());
            settechs(techsArray);
            // console.log(techsArray);
        }); 
    },[]);
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}/>
            <ScrollView style={styles.scroll}>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
   container: {
        flex: 1,
   },
   logo:{
       marginTop: 36,
       height: 32,
       resizeMode:'contain',
       alignSelf: 'center',
       
   },
   scroll:{
        marginBottom: 10
   }
}); 