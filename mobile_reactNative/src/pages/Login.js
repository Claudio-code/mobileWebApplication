import React, { useState, useEffect } from 'react';
import { View,  AsyncStorage, KeyboardAvoidingView, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import logo from '../../assets/logo.png';
import api from '../services/api';
export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [techs, settechs] = useState('');
    useEffect(() => {
        AsyncStorage.getItem('user_id').then(user_id => {
            if (user_id) {
                navigation.navigate('List');        
            }
        })
    }, [])
    async function handleSubmit(){
        console.log(email);
        console.log(techs);
        const response = await api.post('/sessions',{
            email
        });
        console.log(response)
        const { _id } = response.data;
        console.log(_id);
        await AsyncStorage.setItem('user_id', _id);
        await AsyncStorage.setItem('techs', techs);
        navigation.navigate('List');
    }
    return (<KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={logo}/>
            <View style={styles.form}>
                <Text style={styles.label} >Seu E-MAIL</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="seu email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label} >Tecnologias</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Qual tachs vc usa?"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={settechs}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.btnText}>Encontrar Spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        );
}       

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label:{
        fontWeight:'bold',
        color: '#444',
        marginBottom: 8,
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 43,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});