import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapIcon from '../utils/mapIcon';

import mapMarketImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import api from '../services/api';

interface Images {
  id: number;
  path: string;
}

interface Ophanages {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Images[];
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Ophanages[]>([]);

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarketImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita</p>
        </header>

        <footer>
          <strong>Curitiba</strong>
          <span>Paraná</span>
        </footer>
      </aside>

      <Map
        center={[-25.3691177, -49.2334694]}
        zoom={12}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanages.map(orphanage => (
          <Marker
          key={orphanage.id}
          icon={mapIcon}
          position={[orphanage.latitude, orphanage.longitude]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            {orphanage.name}
            <Link to={`/orphanages/${orphanage.id}`}>
              <FiArrowRight size={20} color="#FFF"/>
            </Link>
          </Popup>
        </Marker>
        ))}     
      </Map>
    
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;