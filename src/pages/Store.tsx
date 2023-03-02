import StoreItem from '../components/StoreItem';
import items from '../data/items.json';
import {Row,Col} from 'react-bootstrap';

const Store = () => {
  return (
    <>
     <h1>Store</h1>
    <Row xs={1} md={2} lg={3} className='g-3'>
      {items.map(item=>(
        <Col key={item.id}><StoreItem {...item}/></Col>
      ))}
    </Row>
    </>
   
  )
}

export default Store