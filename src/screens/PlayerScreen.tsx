import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { RootStackScreenProps } from "@navigation";
import { Audio, AVPlaybackStatus } from "expo-av";
import Slider from "@react-native-community/slider";
import { fs, wp, hp, colors } from "@styles";
import { SpinnerHOC } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { Back, BackIcon, Forward, Like, Unlike } from "@icons";
const SpinnerView = SpinnerHOC(View);
export default function PlayerScreen({
  navigation,
  route: { params },
}: RootStackScreenProps<"PlayerScreen">) {
  const { title, author, audio_url, description, dislikes, likes } = params;
  const [playbackInstance, setPlaybackInstance] = useState<Audio.Sound | null>(
    null
  );
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] =
    useState<boolean>(false);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [state, setState] = useState({
    playbackInstanceName: "LOADING_STRING",
    muted: false,
    playbackInstancePosition: 0,
    playbackInstanceDuration: 0,
    shouldPlay: false,
    isPlaying: false,
    isBuffering: false,
    isLoading: true,
    shouldCorrectPitch: true,
    volume: 1.0,
  });

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    loadNewPlaybackInstance(false);
  }, []);
  const loadNewPlaybackInstance = async (playing: boolean) => {
    if (playbackInstance !== null) {
      await playbackInstance.unloadAsync();
      setPlaybackInstance(null);
    }
    const source = { uri: audio_url };
    const initialStatus = {
      shouldPlay: playing,
      shouldCorrectPitch: state.shouldCorrectPitch,
    };

    const { sound } = await Audio.Sound.createAsync(
      source,
      initialStatus,
      onPlaybackStatusUpdate
    );
    setPlaybackInstance(sound);
    setState((prev) => {
      return {
        ...prev,
        isLoading: false,
        playbackInstanceName: title,
      };
    });
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setState((prev) => {
        return {
          ...prev,
          playbackInstancePosition: status.positionMillis,
          playbackInstanceDuration: status.durationMillis as number,
          shouldPlay: status.shouldPlay,
          isPlaying: status.isPlaying,
          isBuffering: status.isBuffering,
          muted: status.isMuted,
          volume: status.volume,
          shouldCorrectPitch: status.shouldCorrectPitch,
        };
      });
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
        navigation.navigate("ErrorModalScreen", {
          text: "Please re start the application!",
        });
      }
    }
  };
  const onPlayPausePressed = () => {
    if (playbackInstance != null) {
      if (state.isPlaying) {
        playbackInstance.pauseAsync();
      } else {
        playbackInstance.playAsync();
      }
    }
  };
  const onSeekSliderValueChange = () => {
    if (playbackInstance != null && !isSeeking) {
      setIsSeeking(true);
      setShouldPlayAtEndOfSeek(state.shouldPlay);
      playbackInstance.pauseAsync();
    }
  };
  const onSeekSliderSlidingComplete = async (value: number) => {
    if (playbackInstance != null) {
      setIsSeeking(false);
      const seekPosition = value * state.playbackInstanceDuration;
      if (shouldPlayAtEndOfSeek) {
        playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };
  const getSeekSliderPosition = () => {
    if (
      playbackInstance != null &&
      state.playbackInstancePosition != null &&
      state.playbackInstanceDuration != null
    ) {
      return state.playbackInstancePosition / state.playbackInstanceDuration;
    }
    return 0;
  };
  const getMMSSFromMillis = (millis: number) => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number: number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  };

  const getTimestamp = () => {
    if (
      playbackInstance != null &&
      state.playbackInstancePosition != null &&
      state.playbackInstanceDuration != null
    ) {
      return `${getMMSSFromMillis(
        state.playbackInstancePosition
      )} / ${getMMSSFromMillis(state.playbackInstanceDuration)}`;
    }
    return "";
  };
  const goTenSecondForwardOrBackward = (value: number) => {
    playbackInstance?.setStatusAsync({
      positionMillis: state.playbackInstancePosition + value,
    });
  };
  return (
    <SpinnerView loading={state.isLoading}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{ marginLeft: wp(32), width: fs(20), height: fs(20) }}
          onPress={() => navigation.goBack()}
        >
          <BackIcon width={fs(18)} height={hp(18)} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
        <View style={styles.playerButtonWrapper}>
          <TouchableOpacity
            style={{ width: fs(20), height: fs(20) }}
            onPress={() => goTenSecondForwardOrBackward(-10000)}
          >
            <Back width={fs(18)} height={hp(18)} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={() => onPlayPausePressed()}
          >
            <Ionicons
              name={!state.isPlaying ? "play-outline" : "pause-outline"}
              color={colors.white}
              size={fs(25)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: fs(20), height: fs(20) }}
            onPress={() => goTenSecondForwardOrBackward(10000)}
          >
            <Forward width={fs(18)} height={hp(18)} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomWrapper}>
          <Slider
            value={getSeekSliderPosition()}
            onValueChange={() => onSeekSliderValueChange}
            onSlidingComplete={onSeekSliderSlidingComplete}
            disabled={state.isLoading}
            minimumTrackTintColor={colors.sliderColor}
            maximumTrackTintColor={colors.white}
            thumbTintColor={colors.sliderColor}
          />
          <View
            style={{
              ...styles.row,
              justifyContent: "space-between",
              marginTop: hp(32),
            }}
          >
            <View style={styles.row}>
              <Like style={{ marginRight: wp(15) }} />
              <Text style={styles.likeText}>{likes}</Text>
            </View>
            <View>
              <Text style={[styles.likeText]}>
                {state.isBuffering ? "...BUFFERING..." : ""}
                <Text style={[styles.likeText, { color: "#ffff" }]}>
                  {getTimestamp()}
                </Text>
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.likeText}>{dislikes}</Text>
              <Unlike style={{ marginLeft: wp(15) }} />
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </SpinnerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: hp(64),
  },
  title: {
    fontSize: fs(24),
    fontWeight: "500",
    color: "#ffff",
    width: wp(236),
    alignSelf: "center",
    textAlign: "center",
    marginTop: hp(48),
  },
  author: {
    fontSize: fs(14),
    fontWeight: "400",
    color: "#898F97",
    width: wp(236),
    alignSelf: "center",
    textAlign: "center",
    marginTop: hp(12),
  },
  playerButtonWrapper: {
    height: hp(120),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(112),
  },
  playPauseButton: {
    backgroundColor: "#FF334B",
    height: fs(50),
    width: fs(50),
    borderRadius: fs(25),
    justifyContent: "center",
    alignItems: "center",
  },
  bottomWrapper: {
    flexGrow: 1,
    borderTopLeftRadius: fs(24),
    borderTopRightRadius: fs(24),
    backgroundColor: "#0f1d2e",
    paddingHorizontal: wp(33),
    paddingVertical: hp(34),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeText: {
    fontSize: fs(14),
    fontWeight: "400",
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
  },
  divider: {
    width: wp(309),
    borderBottomWidth: 1,
    borderColor: "#898F97",
    marginTop: hp(23),
  },
  description: {
    color: "#898F97",
    fontWeight: "400",
    fontSize: fs(13),
    marginTop: hp(20),
  },
});
