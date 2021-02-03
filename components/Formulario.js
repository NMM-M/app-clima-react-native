import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Animated} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Formulario = () => {
    //#region DEFINICIONDE STATES
    const [animacionBoton] = useState(new Animated.Value(1));
    //#endregion


    //#region FUNCIONES PARA COMPONENTES FORMULARIO
    
    //#endregion
    //#region FUNCIONES PARA ANIMACIONES
    const animacionEntrada = () => {
        Animated.spring(animacionBoton, {
            toValue: .95,
            useNativeDriver:true
        }).start();
    }
    const animacionSalida = () =>{
        Animated.spring(animacionBoton,{
            toValue:1,
            friction:5,
            tension:30,
            useNativeDriver:true
        }).start();
    }

    const styleAnimation = {
        transform:[{scale:animacionBoton}]
    };
    //#endregion
    return (
        <>
            <View style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Ciudad:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: Santiago"
                        placeholderTextColor="#bfd6f6" 
                    ></TextInput>
                </View>
                <View>
                    <Text style={styles.label}>Pais:</Text>
                    <Picker
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