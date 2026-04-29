import {Layout} from 'antd';
import {ALL_MAPS} from '../../data';
import MapCard from './MapCard';
import {Content} from "antd/es/layout/layout";

export default function HomePage() {
  return (
      <Layout className="min-h-screen!">
        <Content className="p-6 flex-1">
          <div className="grid gap-4" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))'}}>
            {Object.entries(ALL_MAPS).map(([slug, data]) => (
                <MapCard key={slug} slug={slug} displayName={data.display_name}/>
            ))}
          </div>
        </Content>
      </Layout>
  );
}
