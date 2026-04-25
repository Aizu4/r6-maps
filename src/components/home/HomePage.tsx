import {ALL_MAPS} from '../../data';
import MapCard from './MapCard';
import {Flex} from "antd";

export default function HomePage() {
  return (
      <Flex wrap gap="small">
        {Object.entries(ALL_MAPS).map(([slug, data]) => (
            <MapCard key={slug} slug={slug} displayName={data.display_name}/>
        ))}
      </Flex>
  );
}
