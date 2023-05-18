import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateProvider, getProvider } from '../api/api'

function EditProviderWindow({ show, onClose, providerId }) {
  const refresh = () => window.location.reload(true);

  const [name, setName] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [date_of_contract_sign, setDateOfContractSign] = useState('');
  const [ingredients_count, setIngredientsCount] = useState(0);

  useEffect(() => {
    getProvider(providerId)
      .then((provider) => {
        setName(provider.name);
        setCompanyName(provider.company_name);
        setDateOfContractSign(provider.date_of_contract_sign);
        setIngredientsCount(provider.ingredients_count)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [providerId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const provider = {
      id: providerId,
      name: name,
      company_name: company_name,
      date_of_contract_sign: date_of_contract_sign,
      ingredients_count: ingredients_count,
    };

    updateProvider(providerId, provider)

    onClose();
    refresh();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit provider</Modal.Title>
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
              disabled
            />
          </Form.Group>
          <Form.Group controlId="ingredients_count">
            <Form.Label>Ingredients count:</Form.Label>
            <Form.Control type="number" value={ingredients_count} onChange={(e) => setIngredientsCount(e.target.value)} />
          </Form.Group>
          <Button type="submit" variant="success">Update Provider</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default EditProviderWindow;