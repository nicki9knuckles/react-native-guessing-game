import React, { useState, useEffect } from 'react'
import {
  Button,
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'
import Colors from '../constants/colors'

const GameOverScreen = (props) => {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  )
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  )
  useEffect(() => {
    let mounted = true
    const updateLayout = () => {
      if (!mounted) return
      setAvailableDeviceWidth(Dimensions.get('window').width)
      setAvailableDeviceHeight(Dimensions.get('window').height)
    }

    const changeListener = Dimensions.addEventListener('change', updateLayout)

    return () => {
      mounted = false
      if (changeListener) changeListener.remove()
    }
  })

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View
          style={{
            ...styles.imageContainer,
            ...{
              width: availableDeviceWidth * 0.7,
              height: availableDeviceWidth * 0.7,
              borderRadius: (availableDeviceWidth * 0.7) / 2,
              marginVertical: availableDeviceHeight / 30,
            },
          }}
        >
          <Image
            source={require('../assets/success.png')}
            // source={{
            //   uri: 'https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf.jpg',
            // }}
            style={styles.image}
            resizeMode='cover'
          />
        </View>

        <View
          style={{
            ...styles.resultsContainer,
            ...{ marginVertical: availableDeviceHeight / 60 },
          }}
        >
          <BodyText
            style={{
              ...styles.resultText,
              ...{ fontSize: availableDeviceHeight < 400 ? 16 : 20 },
            }}
          >
            The computer needed{' '}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number{' '}
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>New Game</MainButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultText: {
    textAlign: 'center',
  },
  resultsContainer: {
    marginHorizontal: 30,
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
export default GameOverScreen
