import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, Dimensions, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import Dialog from "react-native-dialog";
import { AsyncStorage } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import Colors from '../themes/Colors';
import ProfileButton from '../components/ProfileButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('Brian Lewis');
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    readName();
  }, [isFocused]);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    setVisible(false);
  };

  const blurComponentIOS = (
    <BlurView style={StyleSheet.absoluteFill} blurType="xlight" blurAmount={50} />
  );

  const setNameFromStorage = (newValue) => {
    setName(JSON.parse(newValue));
  }

  const readName = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      if (name !== null) {
        setNameFromStorage(name);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.profilePictureContainer}>
        <Image
          source={require("../../assets/images/penguin-avatar.png")}
          style={{ width: 0.44 * windowWidth, height: 0.2 * windowHeight}}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <TouchableOpacity
        style={styles.infoIcon}
        onPress={showDialog} >
          <Image
            source={require("../../assets/images/infoIcon.png")}
            style={{ width: 34, height: 34, marginBottom: 16}}
          />
          <Dialog.Container
            style={styles.popup}
            visible={visible}
            footerStyle={styles.popupFooterStyle}>
            <Dialog.Title style={styles.popupTitle}>EMERGENCY BUTTON</Dialog.Title>
            <Dialog.Description style={styles.popupText}>
              This emergency button lets you quickly access emergency functions such as calling your doctor or directions to the nearest hospital all in one place :)
            </Dialog.Description>
            <Dialog.Button label="OK" style={styles.popupOK} onPress={handleCancel}/>
          </Dialog.Container>
      </TouchableOpacity>
      <TouchableOpacity style={styles.emergenccyButton} onPress={() => navigation.navigate('Emergency')}>
          <Text style={styles.emergencyText}>EMERGENCY</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileButton} onPress= {() => navigation.navigate('Saved')}>
        <ProfileButton text="Saved" image="saved"/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileButton} onPress= {() => navigation.navigate('FAQ')}>
        <ProfileButton text="FAQ" image="faq"/>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
  },
  profilePictureContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 30,
    opacity: 0.8
  },
  emergenccyButton: {
    width: '90%',
    height: 52,
    marginBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.coral,
    borderRadius: 20,
  },
  emergencyText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: Colors.white,
  },
  profileButton: {
    width: '90%',
    height: 126,
    marginBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  popup: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: '70%'
  },
  popupFooterStyle: {
    marginTop: -25,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopColor: 'white',
  },
  popupTitle: {
    fontFamily: 'Nunito_700Bold',
    color: Colors.coral,
    fontSize: 20,
    opacity: 0.8,
  },
  popupText: {
    fontFamily: 'NunitoSans_400Regular',
    color: Colors.grey,
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 16,
    marginTop: 16
  },
  popupOK: {
    fontFamily: 'Nunito_700Bold',
    color: Colors.darkPurple,
    fontSize: 20,
    opacity: 0.5
  },
});
