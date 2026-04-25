import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

interface MapCardProps {
  slug: string;
  displayName: string;
}

export default function MapCard({ slug, displayName }: MapCardProps) {
  const navigate = useNavigate();
  return (
    <Button type="primary" block onClick={() => navigate(`/${slug}`)}>
      {displayName}
    </Button>
  );
}
