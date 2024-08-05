import React from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import { FaCartPlus } from "react-icons/fa6";

interface HomepageProps {
  data: { id: number; name: string; category: string; image: string; amount: number }[];
}

const Homepage: React.FC<HomepageProps> = (props) => {
  const { data } = props;

  return (
    <Container>
      <Row>
      {data.map((item, index) => (
        <div className='col-md-3 col-xs-3 col-sm-3 col-lg-3 item' key={item.id}>
          <Card >
            <Card.Img variant="top" src={item.image} className='img' />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <label className='amount'>${item.amount}</label>
              <Button><FaCartPlus /></Button>
            </Card.Body>
          </Card>
        </div>
      ))}
      </Row>
    </Container>
  );
};

export default Homepage;
