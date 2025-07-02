import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import Icon from '@react-native-vector-icons/fontawesome'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'


const DetailScreen = () => {
  const [manga, setManga] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fouvorite, setFouvorite] = useState(false);

  const route = useRoute();
  const { slug } = route.params;
  const navigation = useNavigation();


  const fetchDetailManga = async () => {
    try {
      const response = await axios.get(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`);

      //const response = await axios.get(`https://otruyenapi.com/v1/api/truyen-tranh/dao-hai-tac`);

      if (response.data.status === 'success') {

        const data = response.data.data;
        setManga(data.item);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDetailManga();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Đang tải...</Text>
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
  const imageUrl = `https://img.otruyenapi.com/uploads/comics/${manga.thumb_url}`;

  const addFouvorite = () => {

    setFouvorite(!fouvorite);

  }

  const listChapter = manga.chapters[0];

  return (
    <View style={{ flexDirection: 'column', flex: 1, padding: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ gap: 2 }}>
          <Image source={{ uri: imageUrl }} style={{ width: 125, height: 200, borderRadius: 5 }} />
          <TouchableOpacity style={{ width: 125 }}>
            <Text
              style={{
                backgroundColor: '#CC0000',
                color: 'white',
                margin: 2,
                textAlign: 'center',
                textAlignVertical: 'center',
                lineHeight: 30,
                borderRadius: 4,
              }}>Thêm mới</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 125 }}>
            <Text
              style={{
                backgroundColor: '#FF9900',
                color: 'white',
                margin: 2,
                textAlign: 'center',
                textAlignVertical: 'center',
                lineHeight: 30,
                borderRadius: 4,
              }}>Đọc từ đầu</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingLeft: 10, flex: 1, gap: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', }}>{manga.name}</Text>
          <Text style={{ fontSize: 14, color: 'black' }}>Trạng thái: <Text >{manga.status} </Text></Text>
          <Text style={{ fontSize: 14, color: 'black' }}>Tác giả: <Text>{manga.author[0] ? manga.author.join(', ') : 'Đang cập nhật'}  </Text></Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: 'black', }}>Thể loại: </Text>
            {manga.category.map((category, index) => (
              <Text
                key={index}
                style={{
                  paddingHorizontal: 10,
                  height: 24,
                  backgroundColor: 'green',
                  color: 'white',
                  margin: 2,
                  textAlign: 'center',
                  borderRadius: 4,
                }}
              >
                {category.name}
              </Text>
            ))}
          </View>
          <ScrollView style={{flex: 1}}>
            <Text>{manga.content.replace(/<\/?p>/g, '')}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={{ paddingTop: 10, marginBottom: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          DANH SÁCH CHƯƠNG
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={[...listChapter.server_data].reverse()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => { navigation.navigate('Read', item.chapter_api_data) }}>
              <View
                style={{
                  height: 1,
                  backgroundColor: '#ccc',
                  marginHorizontal: 3
                }}
              />
              <Text style={{ fontSize: 16, paddingBottom: 10 }}>
                Chapter {item.chapter_name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  )
}

export default DetailScreen