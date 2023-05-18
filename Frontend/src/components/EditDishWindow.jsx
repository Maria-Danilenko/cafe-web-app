import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateDish, getDish } from '../api/api'

function EditDishWindow({ show, onClose, productId }) {
  const refresh = () => window.location.reload(true);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(1);
  const [type_id, setTypeId] = useState(1);

  useEffect(() => {
    getDish(productId)
      .then((product) => {
        setName(product.name);
        setPrice(product.price);
        setTypeId(product.type_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      id: productId,
      name: name,
      price: price,
      type_id: type_id,
    };

    updateDish(productId, product)

    onClose();
    refresh();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price:</Form.Label>
            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="type_id">
            <Form.Label>Type id:</Form.Label>
            <Form.Control type="number" value={type_id} onChange={(e) => setTypeId(e.target.value)} />
          </Form.Group>
          <Button type="submit" variant="success">Update Product</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default EditDishWindow;