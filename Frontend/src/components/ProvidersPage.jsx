import React, { useState } from "react";
import { Layout } from "antd";
import { Button } from 'react-bootstrap';
import ProvidersList from "./ProvidersList";
import AddProviderWindow from "./AddProviderWindow";
import EditProviderWindow from './EditProviderWindow'

const { Content } = Layout;

const DishesPage = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProviderId, setSelectedProviderId] = useState(null);

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleShowEditModal = (providerId) => {
        setSelectedProviderId(providerId);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    return (
        <Layout>
            <Content>
                <ProvidersList onEdit={handleShowEditModal} />
            </Content>
            <div>
                <Button type="button" className="btn btn-success" onClick={handleShowAddModal}>
                    Add Provider
                </Button>
                <AddProviderWindow show={showAddModal} onClose={handleCloseAddModal} />
                {selectedProviderId && (
                    <EditProviderWindow
                        show={showEditModal}
                        onClose={handleCloseEditModal}
                        providerId={selectedProviderId}
                    />
                )}
            </div>
        </Layout>
    );
};
export default DishesPage;