import { useNavigate } from 'react-router';
import styles from './Map.module.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCitizes } from '../Context/CitizesContext';
import { useSearchParams } from 'react-router-dom';
import { useGeolocation } from '../hooks/Geolocation';
import { useURLLocation } from '../hooks/GetURLLoaction';
import Button from './Button';

function Map() {
  const [mapPosition, setMapPosition] = useState([50, 50]);
  const { citizes } = useCitizes();
  const [mapLat, mapLng] = useURLLocation();
  const {
    isLoading: isLocationLoading,
    position: isGeolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (mapLat && mapLat) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (isGeolocationPosition) {
        setMapPosition([isGeolocationPosition.lat, isGeolocationPosition.lng]);
      }
    },
    [isGeolocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!isGeolocationPosition && (
        <Button type="position" action={getPosition}>
          {isLocationLoading ? 'Loading...' : 'Your current position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {citizes.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeView position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeView({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigation = useNavigate();
  useMapEvent({
    click: (e) => {
      const { lat, lng } = e.latlng;
      if (lat && lng) {
        navigation(`form?lat=${lat}&lng=${lng}`);
      }
    },
  });
}

export default Map;
