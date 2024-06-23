import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
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
  const [selectedMarker, setSelectedMarker] = useState(null); // State for selected marker
  const [polylineCoords, setPolylineCoords] = useState([]);

  // Example marker coordinates
  const markers = [
    {
      title: "Ayotunde Matthew - 170 Meters from you ",
      coordinate: {
        latitude: 7.6228374,
        longitude: 4.2049641,
      }
    },
    {
      title: "Jonathan Johnson - 2 Miles from you",
      coordinate: {
        latitude: 7.6209416,
        longitude: 4.2020455,
      }
    },
    {
      title: "Adebola Samson - 4 Miles from you",
      coordinate: {
        latitude: 7.6209416,
        longitude: 4.1902892,
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

  // useEffect(() => {
  //   if (!origin || !destination) return;

  //   const getTravelTime = () => {
  //     fetch(
  //       `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${MAPS_API_KEY}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         dispatch(setTravelTimeInfo(data.rows[0].elements[0]));
  //       });
  //   };

  //   getTravelTime();
  // }, [origin, destination]);

  const handleMarkerPress = (markerLocation) => {
    if (origin && markerLocation) {
      const originLatLng = `${origin.location.lat},${origin.location.lng}`;
      const markerLatLng = `${markerLocation.latitude},${markerLocation.longitude}`;

      // fetch(
      //   `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originLatLng}&destinations=${markerLatLng}&key=${MAPS_API_KEY}`
      // )
      //   .then((res) => res.json())
      //   .then((data) => {
      //     const distance = data.rows[0].elements[0].distance.text;
      //     Alert.alert('Distance', `Distance to marker: ${distance}`);
      //     setSelectedMarker(markerLocation);

      //     // Update polyline coordinates to draw the line
          
      //   })
      //   .catch((error) => console.error(error));
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
              strokeWidth={3}
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
            />
          )}

          {markers.map((marker, index) => (
            <Marker
              key={index}
              title={marker.title}
              coordinate={marker.coordinate}
              identifier={`marker-${index}`}
              onPress={() => handleMarkerPress(marker.coordinate)}
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
