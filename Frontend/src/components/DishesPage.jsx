import React, { useState } from "react";
import { Layout } from "antd";
import DishesList from "./DishesList";
import { Button } from 'react-bootstrap';
import AddDishWindow from "./AddDishWindow";
import EditDishWindow from './EditDishWindow'

const { Content } = Layout;

const DishesPage = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleShowEditModal = (productId) => {
        setSelectedProductId(productId);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    return (
        <Layout>
            <Content>
                <DishesList onEdit={handleShowEditModal} />
            </Content>
            <div>
                <Button type="button" className="btn btn-success" onClick={handleShowAddModal}>
                    Add Product
                </Button>
                <AddDishWindow show={showAddModal} onClose={handleCloseAddModal} />
                {selectedProductId && (
                    <EditDishWindow
                        show={showEditModal}
                        onClose={handleCloseEditModal}
                        productId={selectedProductId}
                    />
                )}
            </div>
        </Layout>
    );
};
export default DishesPage;