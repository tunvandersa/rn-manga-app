import { View, Text, FlatList, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ReadScreen = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listImage, setListImage] = useState({});

  const route = useRoute();

  const chapter_api_data = route.params;

  const getRatio = async (uri) => {
    return new Promise((resolve, reject) => {
      Image.getSize(
        uri,
        (width, height) => {
          const ratio = height / width;
          resolve(ratio); 
        },
        (error) => {
          reject(error); 
        }
      );
    });
  };

  const fetchManga = async () => {
    try {
      const response = await axios.get(chapter_api_data);

      if (response.data.status === 'success') {
        const data = response.data.data;
        const domain = data.domain_cdn;
        const path = data.item.chapter_path;

        // const images = [];
        // for (const item of data.item.chapter_image) {
        //   const uri = `${domain}/${path}/${item.image_file}`;
        //   const ratio = await getRatio(uri);
        //   images.push({ uri, ratio });
        // }
        // setListImage(images);

        const imagePromises = data.item.chapter_image.map(async (item) => {
          const uri = `${domain}/${path}/${item.image_file}`;
          const ratio = await getRatio(uri);
          return { uri, ratio };
        });

        const images = await Promise.all(imagePromises);
        setListImage(images);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManga();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đợi chút, truyện đang được tải ...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>Lỗi: {error}</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={listImage}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ width: screenWidth, alignItems: 'center' }}>
            <Image
              source={{ uri: item.uri }}
              style={{
                width: screenWidth,
                height: screenWidth * item.ratio, 
                resizeMode: 'contain',
              }}
            />
          </View>
        )}
        initialNumToRender={3} 
        windowSize={5}         
        maxToRenderPerBatch={5}
      />

    </View>
  )
}

export default ReadScreen