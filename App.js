import React from 'react';
import { StyleSheet, View, Text, Keyboard } from 'react-native';
import Formulario from './components/Formulario';

const App = () => {

  const cerrarTeclado = () =>{
    Keyboard.dismiss();
  }

  return (
    <>
      <View style={styles.app} onPress={() =>cerrarTeclado()}>
        <View style={styles.contenido}>
          <Formulario />
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
});

export default App;
