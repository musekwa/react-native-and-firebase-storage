
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BlurView } from '@react-native-community/blur'
import { Video } from 'expo-av'
import ProgressBar from './ProgressBar'

const Uploading = ({ image, video, progress }) => {


    return (
        <View style={[StyleSheet.absoluteFill, { alignItems: "center", justifyContent: "center", zIndex: 1, }]}>

            <BlurView
                style={StyleSheet.absoluteFill}
                blurAmount={32}
                blurType='light'
                blurRadius={20}
            overlayColor='gray'

            >
            </BlurView>

            <View
                style={{
                    alignItems: "center",
                    width: "70%",
                    minHeight: 100,
                    paddingVertical: 16,
                    rowGap: 12,
                    backgroundColor: "white",
                    borderRadius: 14,
                }}
            >
                {
                    image && (
                        <Image
                            source={{ uri: image }}
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                                borderRadius: 6,
                            }}
                        />
                    )
                }
                {
                    video && (
                        <Video
                            source={{
                                uri: video,
                            }}
                            videoStyle={{}}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode='contain'
                            // shouldPlay
                            // isLooping
                            style={{
                                width: 200,
                                height: 200,
                            }}
                        // useNativeControls
                        />
                    )
                }
                <Text
                    style={{
                        fontSize: 12,
                    }}
                >
                    Uploading...
                </Text>
                <ProgressBar progress={progress} />
                <View
                style={{
                    borderColor: "#00000020",
                    height: 1,
                    width: "100%",
                    borderWidth: StyleSheet.hairlineWidth,
                }} 
                />
                <TouchableOpacity>
                    <Text
                        style={{
                            fontWeight: "500",
                            color: "#3478F6",
                        }}
                    >
                        Cancel
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Uploading

const styles = StyleSheet.create({})