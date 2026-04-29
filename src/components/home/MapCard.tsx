import {Card} from 'antd';
import {useNavigate} from 'react-router-dom';

interface MapCardProps {
  slug: string;
  displayName: string;
}

export default function MapCard({slug, displayName}: MapCardProps) {
  const navigate = useNavigate();

  const cover = (
      <img
          src={`https://picsum.photos/seed/${slug}/320/180`}
          alt={displayName}
          style={{display: 'block', width: '100%', aspectRatio: '16/9', objectFit: 'cover'}}
      />
  );

  return (
      <Card
          hoverable
          cover={cover}
          styles={{body: {padding: '10px 12px'}}}
          onClick={() => navigate(`/${slug}`)}
      ><Card.Meta title={displayName}/>
      </Card>
  );
}
