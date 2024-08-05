import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

interface HomepageProps {
  data: { id: number; name: string; category: string; image: string }[];
}

const Homepage: React.FC<HomepageProps> = (props) => {
  const { data } = props;

  return (
    <ul>
      {data.map((item) => (
          <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default Homepage;
