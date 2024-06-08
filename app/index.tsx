import React, {useEffect, useRef, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAssets, Asset } from 'expo-asset';
import { Link } from 'expo-router';
import { ResizeMode, Video } from 'expo-av';

import Colors from '../constants/Colors';
import { defaultStyles } from '../constants/Styles';

const Page = () => {
  const video = useRef(null);
  // const [assets] = useAssets([require('../assets/videos/intro.mp4')]);
  const [loadedVideo, setLoadedVideo] = useState<Asset[]>()

  useEffect(() => {
    async function loadAsyncVideo () {
      const videoAsset = await Asset.loadAsync(require('../assets/videos/intro.mp4')); 
      setLoadedVideo(videoAsset);
    }

    loadAsyncVideo();
  },[])


  return (
    <View style={styles.container}>
      {loadedVideo ? (
        <Video
          ref={video}
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          source={{ uri: loadedVideo[0].uri}}
          style={styles.video}
        />
      ) : (
        <Text>Loading video...</Text>
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
});

export default Page;
