import {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {ALL_MAPS} from '../../data';
import type {PoiType} from '../../types';
import MapToolbar from './MapToolbar';
import MapViewer from './MapViewer';

export default function MapPage() {
  const {mapSlug} = useParams<{ mapSlug: string }>();
  const navigate = useNavigate();
  const data = ALL_MAPS[mapSlug!];

  const [currentFloor, setCurrentFloor] = useState(Object.keys(data?.floors ?? {})[0] ?? '1');
  const [selectedDisplay, setSelectedDisplay] = useState<string[][]>([]);
  const [selectedBomb, setSelectedBomb] = useState<string[]>([]);

  const poiKeys = new Set(Object.keys(data.poi));
  const visiblePoiTypes = selectedDisplay
    .filter(path => poiKeys.has(path[0]))
    .map(path => path[0] as PoiType);

  const showSpawns = selectedDisplay.some(path => path[0] === 'spawn_locations');

  const activeBomb = data.bomb_locations.find(b => b.name === selectedBomb[0]) ?? null;

  return (
      <div className="fixed inset-0">
        <MapToolbar
            mapData={data}
            currentFloor={currentFloor}
            onFloorChange={setCurrentFloor}
            onBack={() => navigate('/')}
            selectedDisplay={selectedDisplay}
            onDisplayChange={setSelectedDisplay}
            selectedBomb={selectedBomb}
            onBombChange={val => setSelectedBomb(val ?? [])}
        />
        <MapViewer
            data={data}
            currentFloor={currentFloor}
            visiblePoiTypes={visiblePoiTypes}
            showSpawns={showSpawns}
            activeBomb={activeBomb}
        />
      </div>
  )
}
