import { StylesContext } from '@material-ui/styles';
import React,{useState} from 'react';
import * as bootstrap from  'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { useSpeechSynthesis } from 'react-speech-kit';

function NavPillsExample() {

  
  const [text,setText] = useState('');
  const {speak} = useSpeechSynthesis();

  const handleOnClick = () => {
      speak({text:text})
  }

  return (
    <Card>
      <Card.Header>
      
        <Nav variant="pills" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#first">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Card.Img variant={"top"} src={"./images/cards.png"}/>
        <Card.Title classsName="textAreaStyle">Special title treatment</Card.Title>
        <textArea classsName="textAreaStyle" onChange={(e)=>{setText(e.target.value)}}>
        </textArea><br></br><br></br>
        <Button variant="primary me-2 px-3" className="buttonStyle" onClick={()=>{handleOnClick()}}>Listen</Button>
        <Button variant="primary me-2 px-4">Like</Button>
        <Button variant="primary me-2 ">Comment</Button>
        <Button variant="primary me-2">favourite</Button>
      </Card.Body>
    </Card>
  );
}

export default NavPillsExample;