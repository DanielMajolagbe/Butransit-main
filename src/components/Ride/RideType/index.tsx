import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Linking, Button
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import tailwind from 'twrnc';

import { CarsClasses } from '../../../data/mock';
import { selectTravelTimeInfo } from '../../../redux/slices/navSlice';

function RideType() {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState<typeof CarsClasses[0] | null>(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [faqModalVisible, setFaqModalVisible] = React.useState(false);
  const travelTime = useSelector(selectTravelTimeInfo);

  const handleChoosePress = () => {
    setModalVisible(true);
  };

  const handlePress = () => {
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSe2kM9N9OAnZB0GibWUqsG1w4PMcd2l-pwfo1v7ZlzNWXp_tg/viewform?usp=sf_link';
    Linking.openURL(url).catch((err) => console.error('Error:', err));
  };

  const handleCallPress = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) => console.error('Error:', err));
  };

  const handleWhatsAppPress = (phoneNumber) => {
    const url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url).catch((err) => console.error('Error:', err));
  };

  return (
    <SafeAreaView style={tailwind`flex-1 bg-white`}>
      <View style={tailwind`relative flex flex-row p-5 items-center justify-center`}>
        <TouchableOpacity style={tailwind`absolute left-5`} onPress={() => navigation.navigate('ChooseRide')}>
          <Icon
            name="arrow-left"
            type="feather"
            color="black"
            size={30}
            tvParallaxProperties={undefined}
          />
        </TouchableOpacity>
        <Text style={tailwind`text-lg font-bold`}>Featured Drivers</Text>
        <TouchableOpacity
          style={tailwind`absolute right-5`}
          onPress={() => setFaqModalVisible(true)}
        >
          <Icon
            name="question"
            type="font-awesome"
            color="black"
            size={25}
            tvParallaxProperties={undefined}
          />
        </TouchableOpacity>
      </View>
      <View style={tailwind`flex-1`}>
        <FlatList
          style={tailwind`mb-10`}
          data={CarsClasses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tailwind`flex-1 px-5 flex-row justify-between items-center border-b border-gray-300 ${
                selected?.id === item.id ? 'bg-gray-200' : ''
              }`}
              onPress={() => setSelected(item)}
            >
              <View style={tailwind`flex-row items-center`}>
                <Image
                  source={item.image}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                  }}
                />
                <View>
                  <Text style={tailwind`text-lg font-medium`}>{item.title}</Text>
                  <Text style={tailwind`text-sm text-gray-500`}>
                    {travelTime?.duration.text}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={tailwind`text-xl font-medium`}>
                  {item.price}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity
        style={tailwind`absolute bottom-6 left-5 w-[90%] h-14 m-auto rounded-full bg-black`}
        onPress={handleChoosePress}
      >
        <Text style={tailwind`text-lg font-medium text-white text-center p-3 px-5`}>
          Choose {selected?.title}
        </Text>
      </TouchableOpacity>

      {modalVisible && selected && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Confirm Ride</Text>
              
              <Image
                source={selected.roundImage}
                style={styles.roundImage}
              />
               <Text style={styles.modalText}>
                <Text style={styles.modalText}>Your driver is </Text>
                <Text style={styles.modalText2}>{selected.title}.</Text>
              </Text>
              <Text style={styles.warning}>For Rides Outside Bowen University You must have an Exeat!</Text>
             <Text style={styles.modalText}>Driver Information: {selected.driverInfo}</Text>
              <Text style={styles.modalText}>Payment Information: {selected.paymentInfo}</Text>
              <Text style={styles.modalText}>Estimated Cost: {selected.price}</Text>
              

              <View style={styles.iconButtonsContainer}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleCallPress(selected.phoneNumber)}
                >
                  <Icon name="phone" type="feather" color="green" size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleWhatsAppPress(selected.phoneNumber)}
                >
                  <Icon name="whatsapp" type="font-awesome" color="green" size={30} />
                </TouchableOpacity>
              </View>
              

              <TouchableOpacity
                style={styles.callButton2}
                onPress={handlePress}
              >
                <Text style={styles.callButtonText}>Report Driver</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </Modal>
      )}

      {faqModalVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={faqModalVisible}
          onRequestClose={() => setFaqModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Note</Text>
              <Text style={styles.modalText}>
                Rides within Bowen: ₦750
                <View>
                  <Button
                      title="External Trip Price Calculator"
                       onPress={() => navigation.navigate('PriceCalculator')}
                   />
                </View>
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setFaqModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  roundImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  warning: {
    fontSize: 16,
    marginBottom: 10,
    color: 'red',
    textAlign: 'center',
  },
  modalText2: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold', 
  },
  iconButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginBottom: 25,
    marginTop: 20,
  },
  iconButton: {
    flex: 0.5,
    alignItems: 'center',
  },
  callButton2: {
    backgroundColor: '',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  callButtonText: {
    color: 'black',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RideType;
