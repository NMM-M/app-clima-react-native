import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Animated} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Formulario = ({busqueda,setBusqueda,setError,setMessage}) => {
    //#region DEFINICIONDE STATES
    const [animationButton] = useState(new Animated.Value(1));
    const {city,country} = busqueda;
    console.log(city);
    //#endregion


    //#region FUNCIONES PARA COMPONENTES FORMULARIO
        //  Validar datos
        const consultarClima = () =>{
            if (city.trim() === '' || country === ''){
                setMessage('Ambos campos son obligatorios');
                setError(true);
                return;
            }
            setError(false);
        }
    //#endregion
    //#region FUNCIONES PARA ANIMACIONES
    const animacionEntrada = () => {
        Animated.spring(animationButton, {
            toValue: .95,
            useNativeDriver:true
        }).start();
    }
    const animacionSalida = () =>{
        Animated.spring(animationButton,{
            toValue:1,
            friction:5,
            tension:30,
            useNativeDriver:true
        }).start();
    }

    const styleAnimation = {
        transform:[{scale:animationButton}]
    };
    //#endregion
    return (
        <>
            <View style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Ciudad:</Text>
                    <TextInput
                        value={city}
                        style={styles.input}
                        placeholder="Ej: Santiago"
                        placeholderTextColor="#bfd6f6"
                        onChangeText={city => setBusqueda({...busqueda,city})}
                    ></TextInput>
                </View>
                <View>
                    <Text style={styles.label}>Pais:</Text>
                    <Picker
                        selectedValue={country}
                        onValueChange={country =>setBusqueda({...busqueda,country})}
                        style={{color:'#fff', backgroundColor:'#64a1f4'}}
                        itemStyle={{backgroundColor:'#64a1f4', color:'#fff'}}
                    >
                        <Picker.Item label='-- Seleccione el pais --' value='CL' />
                        <Picker.Item label='Chile' value='CL' />
                        <Picker.Item label='Mexico' value='MX' />
                        <Picker.Item label='Estados unidos' value='US' />
                        <Picker.Item label='Argentina' value='AR' />
                        <Picker.Item label='Colombia' value='CO' />
                        <Picker.Item label='Costa Rica' value='CR' />
                        <Picker.Item label='España' value='ES' />
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    onPress={() => consultarClima()}
                    onPressIn={()=>animacionEntrada()}
                    onPressOut={()=>animacionSalida()}
                >
                    <Animated.View 
                        style={[styles.button, styleAnimation]}
                    >
                        <Text style={styles.textButton}>Consultar</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 20,
        color:'#fff'
    },
    input: {
        color:'#fff',
        fontSize:18,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        marginBottom:20,
    },
    button:{
        marginTop:10,
        backgroundColor:'#4a91f2',
        borderRadius:3,
        padding:8,
    },
    textButton:{
        fontSize:18,
        textAlign:'center',
        color:'#FFF'
    },
});

export default Formulario;