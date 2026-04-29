import {useNavigate} from 'react-router-dom';
import Toolbar from './toolbar/Toolbar';
import MapViewer from './MapViewer';
import {useSearchParams} from "react-router";
import MapDisplaySettingsProvider from "./providers/MapDisplaySettingsProvider.tsx";
import MapDataProvider from "./providers/MapDataProvider.tsx";

export default function MapPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  return (
      <div className="fixed inset-0">
        <MapDataProvider>
          <MapDisplaySettingsProvider>
            <Toolbar
                onBack={() => navigate('/')}
                debugEnabled={searchParams.has('debug')}
            />
            <MapViewer/>
          </MapDisplaySettingsProvider>
        </MapDataProvider>
      </div>
  )
}

