import { StatusBar } from 'expo-status-bar';
import { vw, vh } from 'react-native-expo-viewport-units';
import { StyleSheet, Text, TouchableOpacity, View, Linking, BackHandler } from 'react-native';
import words from './words.json';
import { forwardRef, useState } from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function App() {
  const [mode, SetMode] = useState("");
  const [menu, SetMenu] = useState(true);
  const [rand, SetRand] = useState();
  const [eyeIcon, SetEyeIcon] = useState("eye-outline")
  const [prevRand, SetPrevRand] = useState();

  BackHandler.addEventListener('hardwareBackPress', function () {
    if (menu) {
      BackHandler.exitApp()
      return true;
    }
    else {
      SetMenu(true)
      return true;
    }
  });

  const MainScreen = () => {
    return (
      <View>
        <TouchableOpacity style={styles.levelButton}
          onPress={() => { SetMode('easy'); SetMenu(false);SetRand(Math.floor(Math.random() * 25)) }}
        >
          <Text style={styles.levelText}>Легкий</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.levelButton}
          onPress={() => { SetMode('medium'); SetMenu(false);SetRand(Math.floor(Math.random() * 25)) }}
        >
          <Text style={styles.levelText}>Середній</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.levelButton}
          onPress={() => { SetMode('hard'); SetMenu(false); SetRand(Math.floor(Math.random() * 25)) }}
        >
          <Text style={styles.levelText}>Складний</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const WordScreen = () => {
    const numberOfWords = mode === 'easy' ? words.easy.length : mode === "medium" ? words.medium.length : words.hard.length
    console.log(rand, " ", prevRand)
    let n = rand
    while(n === prevRand) {
      n = (Math.floor(Math.random() * numberOfWords))
      SetRand(n)
      console.log(n, "   ", prevRand)
    }
    console.log("lnlk")
    const currentWord = mode === 'easy' ? words.easy[rand] : mode === "medium" ? words.medium[rand] : words.hard[rand]
    return (
      <View>
        <EntypoIcon
          name='chevron-left'
          style={styles.chevronLeft}
          size={vw(10)}
          onPress={() => {
            SetMenu(true)
          }}
        />
        <TouchableOpacity style={styles.meaningBlock}
          onPress={() => {
            Linking.openURL("https://uk.wikipedia.org/wiki/" + currentWord)
          }}
        >
          <Text style={styles.nextWordText}>Дізнатися значення слова</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.hideCircle}
        onPress={()=>{
          eyeIcon === "eye-outline" ? SetEyeIcon("eye-off-outline") : SetEyeIcon("eye-outline")
        }}
        >
          <Ionicons
          name = {eyeIcon}
          size={vh(5)}
          />
        </TouchableOpacity>
        <Text style={styles.wordStyle}>{eyeIcon === "eye-outline" ? currentWord : "*****"}</Text>
        <TouchableOpacity style={styles.nextWord}
          onPress={() => {
            SetRand(Math.floor(Math.random() * numberOfWords))
            SetPrevRand(rand)
          }}
        >
          <Text style={styles.nextWordText}>Наступне слово</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {menu ? MainScreen() : WordScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5F9EA0',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: vw(8),
    fontWeight: '400'
  },
  levelButton: {
    width: vw(70),
    marginVertical: vh(2),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: vh(10),
    backgroundColor: '#fff',
    borderRadius: 50
  },
  wordStyle: {
    fontSize: vw(10),
    color: "#fff",
    alignSelf: 'center',
    fontWeight: '600'
  },
  nextWord: {
    width: vw(70),
    height: vh(10),
    marginTop: vh(20),
    backgroundColor: "#fff",
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute'
  },
  nextWordText: {
    fontSize: vw(6),
    fontWeight: '500',
    textAlign: 'center'
  },
  chevronLeft: {
    position: 'absolute',
    marginLeft: vw(5),
    marginTop: vh(-40),
    color: '#fff'
  },
  meaningBlock: {
    position: 'absolute',
    marginTop: vh(-40),
    width: vw(60),
    height: vh(10),
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hideCircle: {
    position: 'absolute',
    width: vh(10),
    height: vh(10),
    borderRadius: 100,
    marginTop: vh(-20),
    alignSelf: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
