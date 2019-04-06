import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Navbar from './Navbar';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from './Auth';

class EquipmentEdit extends Component {

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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const group = await (await fetch(`/api/equipment/${this.props.match.params.id}`)).json();
            this.setState({item: group});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/equipment', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/equipment');
    }

    render() {
        if (!auth0Client.isAuthenticated()) return null;

        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Equipment' : 'Add Equipment'}</h2>;

        return <div>
            <Navbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="equipmentName">equipmentName</Label>
                        <Input type="text" name="equipmentName" id="equipmentName" value={item.equipmentName || ''}
                               onChange={this.handleChange} autoComplete="equipmentName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="equipmentAvailable">equipmentAvailable</Label>
                        <Input type="boolean" name="equipmentAvailable" id="equipmentAvailable" value={item.equipmentAvailable || ''}
                               onChange={this.handleChange} autoComplete="equipmentAvailable"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="equipmentCost">equipmentCost</Label>
                        <Input type="text" name="equipmentCost" id="equipmentCost" value={item.equipmentCost || ''}
                               onChange={this.handleChange} autoComplete="equipmentCost"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="equipmentDescription">equipmentDescription</Label>
                        <Input type="text" name="equipmentDescription" id="equipmentDescription" value={item.equipmentDescription || ''}
                               onChange={this.handleChange} autoComplete="equipmentDescription"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="equipmentOwner">equipmentOwner</Label>
                        <Input type="text" name="equipmentOwner" id="equipmentOwner" value={item.equipmentOwner || ''}
                               onChange={this.handleChange} autoComplete="equipmentOwner"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="equipmentOwnerPhone">equipmentOwnerPhone</Label>
                        <Input type="text" name="equipmentOwnerPhone" id="equipmentOwnerPhone" value={item.equipmentOwnerPhone || ''}
                               onChange={this.handleChange} autoComplete="equipmentOwnerPhone"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="equipmentOwnerEmail">equipmentOwnerEmail</Label>
                        <Input type="text" name="equipmentOwnerEmail" id="equipmentOwnerEmail" value={item.equipmentOwnerEmail || ''}
                               onChange={this.handleChange} autoComplete="equipmentOwnerEmail"/>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/equipment">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(EquipmentEdit);
