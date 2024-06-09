import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useAssets, Asset } from 'expo-asset';
import { Link } from 'expo-router';
import { ResizeMode, Video } from 'expo-av';
import LottieView from 'lottie-react-native';

import Colors from '../constants/Colors';
import { defaultStyles } from '../constants/Styles';

const HEIGHT = Dimensions.get("screen").height

const Page = () => {
  const video = useRef(null);
  const [assets] = useAssets([require('../assets/videos/intro.mp4')]);
  
  return (
    <View style={styles.container}>
      {assets ? (
        <Video
          ref={video}
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          source={{ uri: assets[0].uri }}
          style={styles.video}
        />
      ) : (
        <LottieView
          autoPlay
          style={styles.lottie}
          source={require('../assets/lotties/loading.json')}
        />
      )} 
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.header}>Ready to change the way you money?</Text>
      </View>

      <View style={styles.buttons}>
        <Link
          href={'/login'}
          style={[defaultStyles.pillButton, { flex: 1, backgroundColor: Colors.dark }]}
          asChild>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '500' }}>Log in</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={'/signup'}
          style={[defaultStyles.pillButton, { flex: 1, backgroundColor: '#fff' }]}
          asChild>
          <TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: '500' }}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  header: {
    fontSize: 36,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  lottie: {
    position: "absolute",
    marginTop: HEIGHT/2,
    height: 180,
    width: 180,
    alignSelf: "center"
  }
});

export default Page;
