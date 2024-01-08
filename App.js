import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, SafeAreaView, Keyboard} from 'react-native';
import Modal from 'react-native-modal';
import api from './src/services/api'

export default function App() {

  const [isModalVisible, setModalVisible] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);

  
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null)

  async function buscar() {
    if(cep == '') {
      setIsModal(true)
      return
    }
    if(cep.length !== 8 ) {
      setModalVisible(true)
      setCep('')
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`);
      
      if (response.data.erro) {
        setErrorModalVisible(true);
      } else {
        setCepUser(response.data);
        setErrorModalVisible(false);
        Keyboard.dismiss();
      }
    } catch (error) {
      console.log('ERROR: ' + error);
      setErrorModalVisible(true);
    }



  }

  function limpar() {
    setCep('')
    inputRef.current.focus()
    setCepUser(null)
    setErrorModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
        <View style={styles.box1}>
            <Text style={styles.text}>Digite o CEP desejado</Text>
            <TextInput 
              style={styles.textInput}
              placeholder='Ex: 65840000'
              value={cep}
              onChangeText={ (texto) => setCep(texto)}
              keyboardType='numeric'
              placeholderTextColor='gray'
              ref={inputRef}
            />
        </View>

        <View style={styles.areaBtn}>

            <TouchableOpacity 
            style={[styles.btn, {backgroundColor: 'green'}]}
            onPress={buscar}
            >
                <Text style={styles.btnText}>Buscar</Text>
            </TouchableOpacity>

            <TouchableOpacity
             style={[styles.btn, {backgroundColor: 'yellow'}]}
             onPress={ limpar }
             >
                <Text style={styles.btnText}>Limpar</Text>
            </TouchableOpacity>
        </View>

          {cepUser &&

        <View style={styles.resultado}>
          <Text style={styles.item}>CEP: {cepUser.cep} </Text>

          {cepUser.logradouro ? (
          <Text style={styles.item}>Logradouro: {cepUser.logradouro}</Text>
          ) : (
          <Text style={styles.item}>Logradouro: (não registrado)</Text>
          )}
          {cepUser.bairro ? (
            <Text style={styles.item}>Bairro: {cepUser.bairro}</Text>
          ) : (
            <Text style={styles.item}>Bairro: (não registrado)</Text>
          )
          }
          
          <Text style={styles.item}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.item}>Estado: {cepUser.uf}</Text>
        </View>
          } 

        <Modal isVisible={isModalVisible}>
           <View style={styles.modalContainer}>
             <Text style={styles.modalText}>Digite um CEP válido</Text>
               <TouchableOpacity onPress={() => setModalVisible(false)}>
                 <Text style={styles.modalCloseText}>Fechar</Text>
              </TouchableOpacity>
            </View>
        </Modal>

        <Modal isVisible={isErrorModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>CEP não encontrado</Text>
              <TouchableOpacity onPress={() => setErrorModalVisible(false)}>
                <Text style={styles.modalCloseText}>Fechar</Text>
              </TouchableOpacity>
          </View>
      </Modal>

      <Modal isVisible={isModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Nenhum número digitado </Text>
              <TouchableOpacity onPress={() => setIsModal(false)}>
                <Text style={styles.modalCloseText}>Fechar</Text>
              </TouchableOpacity>
          </View>
      </Modal>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
  },
  box1: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10, 
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 22,
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    color: 'white',
    fontSize: 22,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalCloseText: {
    fontSize: 16,
    color: 'blue',
  },

});
