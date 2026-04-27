import { useNavigate} from 'react-router-dom';
import MapToolbar from './MapToolbar';
import MapViewer from './MapViewer';

import {useSearchParams} from "react-router";
import MapDisplaySettingsProvider from "./MapDisplaySettingsProvider.tsx";
import MapDataProvider from "./MapDataProvider.tsx";

export default function MapPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  return (
      <div className="fixed inset-0">
        <MapDataProvider>
          <MapDisplaySettingsProvider>
            <MapToolbar
                onBack={() => navigate('/')}
                debugEnabled={searchParams.has('debug')}
            />
            <MapViewer/>
          </MapDisplaySettingsProvider>
        </MapDataProvider>
      </div>
  )
}

