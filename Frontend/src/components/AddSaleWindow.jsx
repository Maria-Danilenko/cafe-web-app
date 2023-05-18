import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { addSale, getDish } from '../api/api';

function AddSaleWindow({ show, onClose }) {
  const refresh = () => window.location.reload(true);

  const [dish_id, setDishId] = useState(0);
  const [type_id, setTypeId] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sale = {
      dish_id: dish_id,
      type_id: type_id,
    };

    try {
      const product = await getDish(dish_id);

      if (product && product.type_id == type_id) {
        await addSale(sale);
        onClose();
        refresh();
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add sale</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert && (
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            Dishes with this type do not exist!
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="company_name">
            <Form.Label>Dish id:</Form.Label>
            <Form.Control type="number" value={dish_id} onChange={(e) => setDishId(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Type id:</Form.Label>
            <Form.Control type="number" value={type_id} onChange={(e) => setTypeId(e.target.value)} />
          </Form.Group>
          <Button type="submit" variant="success">
            Add Sale
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddSaleWindow;