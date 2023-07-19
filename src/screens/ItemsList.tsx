import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SimpleGrid} from 'react-native-super-grid';
import {launchesAPI} from '../services/launchService';

const ItemsList = () => {
  const [launchData, setLaunchData] = useState([]);
  const [launchDataDup, setLaunchDataDup] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    launchesAPIcall();
  }, []);

  const launchesAPIcall = async () => {
    setLoading(true);
    await launchesAPI()
      .then((response: any) => {
        if (response.status === 200) {
          setLaunchData(response.data);
          setLaunchDataDup(response.data);
          setLoading(false);
        } else {
          setLoading(false);
          setLaunchData([]);
        }
      })
      .catch(error => {
        console.log('launchesAPIcall error', error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const modalHandler = (item: any) => {
    setModalVisible(true);
    setModalData(item.details);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const ViewModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalData}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalData('');
                setModalVisible(false);
              }}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  const filterSearch = (searchString: string) => {
    setSearchText(searchString);
    if (searchString.length !== 0) {
      let oldRecord = launchData;
      let finalData = launchDataDup.length > 0 ? launchDataDup : oldRecord;
      let filterSeacrhResult: any = finalData.filter((item: any) => {
        let title = item?.mission_name.toLowerCase();
        let searchName = searchString.toLowerCase();
        if (title.match(searchName)) {
          return item;
        }
      });
      [...filterSeacrhResult];
    } else {
      [...launchData];
    }
  };

  return (
    <View>
      <Text>ItemsList</Text>
      <TextInput
        style={styles.input}
        onChangeText={e => filterSearch(e)}
        value={searchText}
        placeholder="Search"
        keyboardType="default"
      />
      {loading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <ScrollView>
          {ViewModal()}
          <SimpleGrid
            itemDimension={180}
            data={launchData}
            renderItem={({item}: any) => {
              return (
                <TouchableOpacity
                  onPress={() => modalHandler(item)}
                  style={styles.container}
                  key={item.flight_number}>
                  <View style={styles.card_template}>
                    <Image
                      style={styles.card_image}
                      source={{
                        uri: item.links.mission_patch,
                      }}
                    />
                    <View style={styles.text_container}>
                      <Text style={styles.card_title}>{item.mission_name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            listKey={undefined}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default ItemsList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    backgroundColor: 'gray',
    borderRadius: 8,
  },
  card_template: {
    width: 180,
    height: 180,
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
  },
  card_image: {
    width: 180,
    height: 180,
    borderRadius: 10,
  },
  text_container: {
    position: 'absolute',
    width: 180,
    height: 30,
    bottom: 0,
    padding: 5,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card_title: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
});
