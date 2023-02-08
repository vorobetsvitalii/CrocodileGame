import { StatusBar } from 'expo-status-bar';
import { vw, vh } from 'react-native-expo-viewport-units';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import words from './words.json';
import { useState } from 'react';

export default function App() {
  const [mode, SetMode] = useState("hard");
  const [menu, SetMenu] = useState(true);     

  const MainScreen = () => {
    return (
      <View>
        <TouchableOpacity style={styles.levelButton}
        onPress={() => {SetMode('easy'); SetMenu(false)}}
        >
          <Text style={styles.levelText}>Легкий</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.levelButton}
        onPress={() => {SetMode('middle'); SetMenu(false)}}
        >
          <Text style={styles.levelText}>Середній</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.levelButton}
        onPress={() => {SetMode('hard'); SetMenu(false)}}
        >
          <Text style={styles.levelText}>Складний</Text>
        </TouchableOpacity>
      </View>
    )
  }     

  const WordScreen = () => {
    const numberOfWords = mode === 'easy' ? words.easy.length : mode === "medium" ? words.medium.length : words.hard.length
    const rand = Math.floor(Math.random() * numberOfWords);
    return (
      <View style={{ justifyContent: 'center' }}>
        <Text>{ mode === 'easy' ? words.easy[rand] : mode === "medium" ? words.medium[rand] : words.hard[rand]}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {menu ? MainScreen(): WordScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#98FB98',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: vw(10),
    color: "#fff",
  },
  levelButton: {
    width: vw(70),
    marginVertical: vh(2),
    alignItems: 'center',
    justifyContent: 'center',
    height: vh(10),
    backgroundColor: 'green',
    borderRadius: 50
  }
});
