import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addProvider } from '../api/api'

function AddProviderWindow({ show, onClose }) {
  const refresh = () => window.location.reload(true);
  const currentDate = new Date();
  const maxDate = currentDate.toISOString().slice(0, 10);
  const currentTime = currentDate.toTimeString().slice(0, 5);
  const maxDateTime = `${maxDate}T${currentTime}`;

  const [name, setName] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [date_of_contract_sign, setDateOfContractSign] = useState('');
  const [ingredients_count, setIngredientsCount] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const provider = {
      name: name,
      company_name: company_name,
      date_of_contract_sign: date_of_contract_sign,
      ingredients_count: ingredients_count,
    };

    addProvider(provider);

    onClose();
    refresh();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add provider</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="company_name">
            <Form.Label>Company name:</Form.Label>
            <Form.Control type="text" value={company_name} onChange={(e) => setCompanyName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="date_of_contract_sign">
            <Form.Label>Date of contract sign:</Form.Label>
            <Form.Control
              type="datetime-local"
              value={date_of_contract_sign}
              onChange={(e) => setDateOfContractSign(e.target.value)}
              //max={new Date().toISOString().slice(0, 16)}
              max={maxDateTime}

            />
          </Form.Group>
          <Form.Group controlId="ingredients_count">
            <Form.Label>Ingredients count:</Form.Label>
            <Form.Control type="number" value={ingredients_count} onChange={(e) => setIngredientsCount(e.target.value)} />
          </Form.Group>
          <Button type="submit" variant="success">Add Provider</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddProviderWindow;
