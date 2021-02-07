import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Keyboard } from 'react-native';
import Formulario from './components/Formulario';
import Clima  from './components/Clima';


const App = () => {
  //#region DEFINICION DE STATES
  const [busqueda, setBusqueda] = useState ({
    city:'',
    country:'',
  });
  const [error,setError] = useState(false);
  const [message, setMessage] = useState('Hubo un error.');
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const {city,country} = busqueda;
  const [bgcolor, setBgcolor] = useState('#3b7dd8');

  //#endregion
  //#region USEEFFECT
    useEffect(() => {
      const consultarClima = async () =>{
        if (consultar){
          const appID = '5ad520fc7eaad50eb347a14d904a3a76'
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appID}`
          console.log(url);
          try {
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            setResultado(resultado);
            setConsultar(false);
            const {main} = resultado;
            const kelvin = 273.15;
            const actual = main.temp - kelvin;
            if (actual < 10 ) {
              setBgcolor('rgb(105,108,149)');
            }else if(actual >= 10 && actual < 25){
              setBgcolor('#3b7dd8');
            }else{
              setBgcolor('rgb(178,28,61)');
            }

          } catch (error) {
            setError(true);
            setMessage('No tenemos datos para esta locación')
          }
        }
      }
      consultarClima();
    },[consultar]);
  //#endregion

  //#region FUNCIONES
    const cerrarTeclado = () =>{
      Keyboard.dismiss();
    }


  //#endregion
  //#region COMPONENTES
    const Alert = () =>{
      return(
        <View style={styles.alert}>
          <Text style={styles.textAlert}>{message}</Text>
        </View>
      );
    }
  //#endregion
  //#region OBJETOS
    const bgColorAPP = {
      backgroundColor:bgcolor
    }
  //#endregion 
  return (
    <>
      <View style={[styles.app, bgColorAPP]} onPress={() =>cerrarTeclado()}>
        <View style={styles.contenido}>
          <Text style={styles.title}>Pronostico</Text>
          {error ?<Alert/> : null}
          <Clima
            resultado={resultado}
          />
          <Formulario 
            busqueda = {busqueda}
            setBusqueda={setBusqueda}
            setError={setError}
            setMessage={setMessage}
            setConsultar={setConsultar}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#3b7dd8',
    justifyContent: 'center',
    padding: '2.5%'
  },
  title:{
    textAlign:'center',
    fontSize:24,
    fontWeight:'bold',
    color:'#fff',
    letterSpacing:1,
    marginBottom:10,
  },
  alert:{
    padding:10,
    borderRadius:5,
    borderColor:'#ff5555',
    borderWidth:2,
    backgroundColor:'#ff8080',
    marginVertical:5,
  },
  textAlert:{
    color:'#fff',
    fontSize:16,
    textAlign:'center',
    fontWeight:'bold',
    letterSpacing:1
  }
});

export default App;
