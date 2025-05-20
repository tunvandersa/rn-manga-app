import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 64) / 3;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 16,
  },
  mangaItem: {
    height: 'auto',
    width: itemWidth,
    marginBottom: 16,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
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
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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