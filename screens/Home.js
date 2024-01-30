import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EmptyState from '../components/EmptyState'
import ProgressBar from '../components/ProgressBar'
import Uploading from '../components/Uploading'
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db, storage } from '../firebaseConfig'
import { Video } from 'expo-av'


const Home = () => {
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);

  useEffect(()=>{
    const unsubscribe = onSnapshot(collection(db, "files"), (snapshot)=>{
      snapshot.docChanges().forEach((change)=>{
        if(change.type === "added"){
          console.log("New file", change.doc.data());
          setFiles((prevFiles)=>[...prevFiles, change.doc.data()]);
        }
      })
    });

    return ()=> unsubscribe();

  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // upload the image
      await uploadImage(result.assets[0].uri, "image")
    }
  }

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
      // videoQuality
    });
    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      // upload the image
      await uploadImage(result.assets[0].uri, "video");
    }
  }

  const uploadImage = async (uri, fileType)=>{
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, "Stuff/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on("state_change", (snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      setProgress(progress.toFixed())
    },
    
    (error)=>{
      // handle error
    },
    ()=>{
      // when upload is complete
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
        // save record to firebase
        console.log("File available ate", downloadURL);
        await saveRecord(fileType, downloadURL, new Date().toISOString())
        setImage("");
        setVideo("");
      })
    }
    )
  }

  const saveRecord = async (fileType, url, createdAt)=>{
    try {
      console.log("saving the record")
      const docRef = await addDoc(collection(db, "files"), {
        fileType,
        url,
        createdAt,
      });
      console.log("Document saved successfully!", docRef);
    } catch (error) {
      console.log(error)
    }
  }

  console.log("files", files)

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <FlatList 
        data={files}
        keyExtractor={(item)=>item.createdAt}
        renderItem={({item})=>{
          if (item.fileType === "image"){
            return (
              <Image
                source={{ uri: item.url }}
                style={{
                  width: "34%",
                  height: 100,
                }}
              />
            )
            
          }
          else {
            return (
              <Video 
                source={{ uri: item.url}}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode='cover'
                shouldPlay
                // isLooping
                style={{ width: "34%", height: 100}}
                // useNativeControls
              />
            )
          }
        }}
        numColumns={3}
        contentContainerStyle={{ 
          gap: 2,
        }}
        columnWrapperStyle={{
          gap: 2
        }}
      />

      {
        (image || video) && (
          <Uploading 
            image={image}
            video={video}
            progress={progress} 
          />
        )
      }
     
      <TouchableOpacity
        onPress={pickImage}
        style={{
          position: "absolute",
          bottom: 130,
          right: 30,
          width: 44,
          height: 44,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <Ionicons name="image" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pickVideo}
        style={{
          position: "absolute",
          bottom: 200,
          right: 30,
          width: 44,
          height: 44,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <Ionicons name="videocam" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})