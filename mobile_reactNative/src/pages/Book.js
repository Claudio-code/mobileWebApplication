import React, {useState} from 'react';
import { 
    TouchableOpacity, 
    Platform, 
    Text, 
    AsyncStorage, 
    TextInput, 
    SafeAreaView, 
    StyleSheet,
    Alert 
} from 'react-native';
import api from '../services/api';
export default function Book({ navigation }) {
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');
    
    function handleCancel() {
        navigation.navigate('List');
    }
    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user_id');
        const response = await api.post(`/spots/${id}/bookings`, {
            date:date
        }, {
            headers:{
                user_id: user_id
            }
        });
        Alert.alert('Solicitação de reserva feita com sucesso.');
        navigation.navigate('List');
    }
    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <Text style={styles.label} >Data de interece</Text>
            <TextInput 
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.btnText}>Solicitar Reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.buttonCancel}>
                <Text style={styles.btnTextCancel}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    label:{
        fontWeight:'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 4
    },
    button: {
        height: 43,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    btnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonCancel: {
        height: 43,
        marginTop: 10,
        backgroundColor: '#bdbdbd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    btnTextCancel: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    droidSafeArea: {
        flex: 1,
        marginTop: 60,
        padding: 30,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
})