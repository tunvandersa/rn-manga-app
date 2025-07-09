import { View, Text, TextInput, FlatList, Image, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import Icon from '@react-native-vector-icons/fontawesome'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import styles from '../styles/HomeScreen.styles'
import { Button } from '@react-navigation/elements'


const MangaItem = ({ item }) => {
  const navigation = useNavigation();
  const imageUrl = `https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`;

  return (
    <TouchableOpacity style={styles.mangaItem} onPress={() => { navigation.navigate('Detail', { slug: item.slug }) }}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.mangaImage}
        resizeMode="cover"
      />
      <Text numberOfLines={2} style={styles.mangaName}>
        {item.name}
      </Text>
      <Text style={styles.chapterInfo}>
        Chapter {item.chaptersLatest?.[0]?.chapter_name || 'N/A'}
      </Text>
    </TouchableOpacity>
  );
};



const SearchScreen = () => {
  const [searchInput, setSearchInput] = useState();
  const [mangaList, setMangaList] = useState([]);
  const [error, setError] = useState(null);


  const handleTextInput = (value) => {
    setSearchInput(value);
  }
  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://otruyenapi.com/v1/api/tim-kiem?keyword=${searchInput}`);
      if (response.data.status === 'success') {
        const data = response.data.data;
        setMangaList(data);
      }
    } catch (error) {
      setError(error);
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6', padding: 10 }}>
      <View style={{marginBottom: 10, alignItems: 'center', }}>
        <View style={{ flexDirection: 'row', width: '90%', borderRadius: 25, borderWidth: 1, alignItems: 'center' }}>
          <Icon style={{ marginRight: 8, marginLeft: 10 }} name={'search'} size={18} color={'#888'} />
          <TextInput
            style={{ height: 40, flex: 1, color: '#222' }}
            placeholder='Search by title or author'
            onChangeText={handleTextInput}
            onSubmitEditing={handleSearch}
            returnKeyType='search'
          />
          <TouchableOpacity style={{ width: 100 }} onPress={handleSearch}>
            <Text
              style={{
                backgroundColor: '#CC0000',
                color: 'white',
                margin: 2,
                textAlign: 'center',
                textAlignVertical: 'center',
                lineHeight: 30,
                borderRadius: 25,
              }}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={mangaList.items}
        renderItem={({ item }) => <MangaItem item={item} />}
        keyExtractor={item => item.name}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

export default SearchScreen
// import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
// import React, { useState } from 'react'
// import Icon from '@react-native-vector-icons/fontawesome'
// import axios from 'axios'
// import { useNavigation } from '@react-navigation/native'
// import styles from '../styles/HomeScreen.styles'

// const MangaItem = ({ item }) => {
//   const navigation = useNavigation();
//   const imageUrl = `https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`;
//   return (
//     <TouchableOpacity
//       style={{
//         flex: 1,
//         margin: 8,
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         elevation: 2,
//         alignItems: 'center',
//         padding: 8,
//       }}
//       onPress={() => navigation.navigate('Detail', { slug: item.slug })}
//     >
//       <Image
//         source={{ uri: imageUrl }}
//         style={{ width: 90, height: 120, borderRadius: 8, marginBottom: 6 }}
//         resizeMode="cover"
//       />
//       <Text numberOfLines={2} style={{ fontWeight: 'bold', fontSize: 13, textAlign: 'center' }}>
//         {item.name}
//       </Text>
//       <Text style={{ color: '#888', fontSize: 12 }}>
//         Chapter {item.chaptersLatest?.[0]?.chapter_name || 'N/A'}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// const SearchScreen = () => {
//   const [searchInput, setSearchInput] = useState('');
//   const [mangaList, setMangaList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     if (!searchInput.trim()) return;
//     setLoading(true);
//     setError(null);
//     setMangaList([]);
//     try {
//       const response = await axios.get(`https://otruyenapi.com/v1/api/tim-kiem?keyword=${searchInput}`);
//       if (response.data.status === 'success') {
//         setMangaList(response.data.data || []);
//       } else {
//         setError('Không tìm thấy kết quả.');
//       }
//     } catch (err) {
//       setError('Có lỗi xảy ra, vui lòng thử lại.');
//     }
//     setLoading(false);
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
//       <View style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         margin: 16,
//         backgroundColor: '#fff',
//         borderRadius: 25,
//         paddingHorizontal: 16,
//         elevation: 2,
//       }}>
//         <Icon name="search" size={20} color="#888" />
//         <TextInput
//           style={{
//             flex: 1,
//             height: 44,
//             marginLeft: 10,
//             fontSize: 16,
//             color: '#222',
//           }}
//           placeholder="Nhập tên truyện hoặc tác giả..."
//           value={searchInput}
//           onChangeText={setSearchInput}
//           onSubmitEditing={handleSearch}
//           returnKeyType="search"
//         />
//         <TouchableOpacity
//           onPress={handleSearch}
//           style={{
//             backgroundColor: '#CC0000',
//             borderRadius: 20,
//             paddingHorizontal: 16,
//             paddingVertical: 8,
//             marginLeft: 8,
//           }}
//         >
//           <Text style={{ color: '#fff', fontWeight: 'bold' }}>Tìm kiếm</Text>
//         </TouchableOpacity>
//       </View>

//       {loading && (
//         <ActivityIndicator size="large" color="#CC0000" style={{ marginTop: 30 }} />
//       )}

//       {error && !loading && (
//         <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</Text>
//       )}

//       {!loading && !error && mangaList.length === 0 && (
//         <Text style={{ color: '#888', textAlign: 'center', marginTop: 30 }}>
//           Nhập từ khóa để tìm truyện...
//         </Text>
//       )}

//       <FlatList
//         data={mangaList.items}
//         renderItem={({ item }) => <MangaItem item={item} />}
//         keyExtractor={item => item.slug}
//         numColumns={3}
//         contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={null}
//       />
//     </View>
//   );
// };

// export default SearchScreen