import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class EquipmentList extends Component {

    constructor(props) {
        super(props);
        this.state = {equipment: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/api/equipment')
            .then(response => response.json())
            .then(data => this.setState({equipment: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/equipment/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedEquipment = [...this.state.equipment].filter(i => i.id !== id);
            this.setState({equipment: updatedEquipment});
        });
    }

    render() {
        const {equipment, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const equipmentList = equipment.map(equipment => {

            return <tr key={equipment.id}>
                <td style={{whiteSpace: 'nowrap'}}>{equipment.equipmentName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{equipment.equipmentAvailable}</td>
                <td style={{whiteSpace: 'nowrap'}}>{equipment.equipmentCost}</td>
                <td style={{whiteSpace: 'nowrap'}}>{equipment.equipmentDescription}</td>
                <td style={{whiteSpace: 'nowrap'}}>{equipment.equipmentOwner}</td>
                <td style={{whiteSpace: 'nowrap'}}>{equipment.equipmentOwnerPhone}</td>
                <td style={{whiteSpace: 'nowrap'}}>{equipment.equipmentOwnerEmail}</td>

                <td>
                    <ButtonGroup className="float-right">
                        <Button size="sm" color="primary" tag={Link} to={"/equipmentedit/" + equipment.equipmentId}>Update</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(equipment.equipmentId)} >Remove</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/equipmentedit/new">Add Equipment</Button>
                    </div>
                    <h3>Equipment List</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="10%">Item</th>
                            <th width="10%">Available</th>
                            <th width="15%">Rental Cost</th>
                            <th width="20%">Description</th>
                            <th width="15%">Owner</th>
                            <th width="10%">Owner Phone</th>
                            <th width="15%">Owner Email</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {equipmentList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default EquipmentList;
