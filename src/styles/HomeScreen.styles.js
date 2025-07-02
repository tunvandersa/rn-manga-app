import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 40) / 3;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  listContainer: {
    paddingBottom: 16,
  },
  mangaItem: {
    height: 'auto',
    width: itemWidth,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mangaImage: {
    width: '100%',
    height: itemWidth * 1.4,
  },
  mangaName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginHorizontal: 8,
    marginBottom: 4,
  },
  chapterInfo: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 8,
    marginBottom: 8,
  },
});