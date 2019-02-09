import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class EquipmentDisplay extends Component {

    emptyItem = {
        equipmentName: '',
        equipmentAvailable: '',
        equipmentCost: '',
        equipmentDescription: '',
        equipmentOwner: '',
        equipmentOwnerPhone: '',
        equipmentOwnerEmail: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };

    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const group = await (await fetch(`/api/equipment/${this.props.match.params.id}`)).json();
            this.setState({item: group});
        }
    }

    render() {
        const {item} = this.state;
        const title = <h2>Equipment Details</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="equipmentName">equipmentName</Label>
                        <Input type="text" name="equipmentName" id="equipmentName" value={item.equipmentName || ''}
                               autoComplete="equipmentName"/>

                        <Label for="equipmentAvailable">equipmentAvailable</Label>
                        <Input type="text" name="equipmentAvailable" id="equipmentAvailable" value={item.equipmentAvailable || ''}
                               autoComplete="equipmentAvailable"/>

                        <Label for="equipmentCost">equipmentCost</Label>
                        <Input type="text" name="equipmentCost" id="equipmentCost" value={item.equipmentCost || ''}
                               autoComplete="equipmentCost"/>

                        <Label for="equipmentDescription">equipmentDescription</Label>
                        <Input type="text" name="equipmentDescription" id="equipmentDescription" value={item.equipmentDescription || ''}
                               autoComplete="equipmentDescription"/>

                        <Label for="equipmentOwner">equipmentOwner</Label>
                        <Input type="text" name="equipmentOwner" id="equipmentOwner" value={item.equipmentOwner || ''}
                               autoComplete="equipmentOwner"/>

                        <Label for="equipmentOwnerPhone">equipmentOwnerPhone</Label>
                        <Input type="text" name="equipmentOwnerPhone" id="equipmentOwnerPhone" value={item.equipmentOwnerPhone || ''}
                               autoComplete="equipmentOwnerPhone"/>

                        <Label for="equipmentOwnerEmail">equipmentTerrain</Label>
                        <Input type="text" name="equipmentOwnerEmail" id="equipmentOwnerEmail" value={item.equipmentOwnerEmail || ''}
                               autoComplete="equipmentOwnerEmail"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="success" tag={Link} to="/equipment">Return</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(EquipmentDisplay);
