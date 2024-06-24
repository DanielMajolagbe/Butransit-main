import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Alert, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import LocationContext from '../../context/Location/LocationContext';
import {
  selectDestination,
  selectOrigin,
  setOrigin,
  setTravelTimeInfo,
} from '../../redux/slices/navSlice';

function Map() {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef<MapView>(null);
  const location = useContext(LocationContext);
  const dispatch = useDispatch();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [polylineCoords, setPolylineCoords] = useState([]);

  const carImage = require('./UberXL.webp'); // Import the car image

  const markers = [
    {
      title: "Ayotunde Matthew - 170 Meters away ",
      coordinate: {
        latitude: 7.6228374,
        longitude: 4.2049641,
      }
    },
    {
      title: "Adebola Samson - 2.9 km away",
      coordinate: {
        latitude: 7.653235,
        longitude: 4.1231823,
      }
    },
    {
      title: "Adekunle Ayomide - 1.3Km away",
      coordinate: {
        latitude: 7.6209416,
        longitude: 4.2020455,
      }
    },
    {
      title: "Adebola Samson - 2.9 km away",
      coordinate: {
        latitude: 7.6209416,
        longitude: 4.1902892,
      }
    },
    {
      title: "",
      coordinate: {
        latitude: 7.6229374,
        longitude: 4.2049152,
      }
    },
    {
      title: "",
      coordinate: {
        latitude: 7.6228457,
        longitude: 4.2049356,
      }
    },
    {
      title: "",
      coordinate: {
        latitude: 7.6226852,
        longitude: 4.2049755,
      }
    },
    {
      title: "",
      coordinate: {
        latitude: 7.6205092,
        longitude: 4.1985634,
      }
    },
    {
      title: "",
      coordinate: {
        latitude: 7.6249669,
        longitude: 4.1932348,
      }
    },
    {
      title: "",
      coordinate: {
        latitude: 7.6248775,
        longitude: 4.1931621,
      }
    },
  ];

  if (!origin && location) {
    dispatch(
      setOrigin({
        location: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      })
    );
  }

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  const handleMarkerPress = (markerLocation) => {
    if (origin && markerLocation) {
      const originLatLng = `${origin.location.lat},${origin.location.lng}`;
      const markerLatLng = `${markerLocation.latitude},${markerLocation.longitude}`;
    }
  };

  return (
    <View style={styles.container}>
      {origin && (
        <MapView
          ref={mapRef}
          style={styles.map}
          mapType="mutedStandard"
          initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
        >
          {polylineCoords.length > 0 && (
            <Polyline
              coordinates={polylineCoords}
              strokeColor="black"
              strokeWidth={10}
            />
          )}

          {origin?.location && (
            <Marker
              title="Your Location"
              coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
              }}
              identifier="origin"
              onPress={() => handleMarkerPress(origin.location)}
            />
          )}

          {destination?.location && (
            <Marker
              title={destination.description}
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              identifier="destination"
              onPress={() => handleMarkerPress(destination.location)}
              image={carImage} 
              style={{ width: 10, height: 10 }} // Set the size of the marker
              anchor={{ x: 0.5, y: 0.5 }} // Center the marker
            />
          )}
          
          {destination?.location && (
            <Marker
              title={destination.description}
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              identifier="destination"
              onPress={() => handleMarkerPress(destination.location)}
              image={carImage} 
              style={{ width: 40, height: 40 }} // Set the size of the marker
              anchor={{ x: 0.5, y: 0.5 }} // Center the marker
            />
          )}  
          {destination?.location && (
            <Marker
              title={destination.description}
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              identifier="destination"
              onPress={() => handleMarkerPress(destination.location)}
              image={carImage} 
              style={{ width: 40, height: 40 }} // Set the size of the marker
              anchor={{ x: 0.5, y: 0.5 }} // Center the marker
            />
          )}  
          {destination?.location && (
            <Marker
              title={destination.description}
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              identifier="destination"
              onPress={() => handleMarkerPress(destination.location)}
              image={carImage} 
              style={{ width: 40, height: 40 }} // Set the size of the marker
              anchor={{ x: 0.5, y: 0.5 }} // Center the marker
            />
          )}  
          {destination?.location && (
            <Marker
              title={destination.description}
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              identifier="destination"
              onPress={() => handleMarkerPress(destination.location)}
              image={carImage} 
              style={{ width: 40, height: 40 }} // Set the size of the marker
              anchor={{ x: 0.5, y: 0.5 }} // Center the marker
            />
          )}  
          {destination?.location && (
            <Marker
              title={destination.description}
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              identifier="destination"
              onPress={() => handleMarkerPress(destination.location)}
              image={carImage} 
              style={{ width: 40, height: 40 }} // Set the size of the marker
              anchor={{ x: 0.5, y: 0.5 }} // Center the marker
            />
          )}  
          {destination?.location && (
            <Marker
              title={destination.description}
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              identifier="destination"
              onPress={() => handleMarkerPress(destination.location)}
              image={carImage} 
              style={{ width: 40, height: 40 }} // Set the size of the marker
              anchor={{ x: 0.5, y: 0.5 }} // Center the marker
            />
          )}  
          {destination?.location && (
            <Marker
              title={destination.description}
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              identifier="destination"
              onPress={() => handleMarkerPress(destination.location)}
              image={carImage} 
              style={{ width: 40, height: 40 }} // Set the size of the marker
              anchor={{ x: 0.5, y: 0.5 }} // Center the marker
            />
          )}  

          {markers.map((marker, index) => (
            <Marker
              key={index}
              title={marker.title}
              coordinate={marker.coordinate}
              identifier={`marker-${index}`}
              onPress={() => handleMarkerPress(marker.coordinate)}
              image={carImage} 
              style={{ width: 40, height: 40 }} // Set the size of the marker
              anchor={{ x: 0.5, y: 0.5 }}// Use the car image for the marker
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
