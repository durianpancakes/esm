import {useEffect, useState} from "react";
import {Modal, Button, Alert} from "react-bootstrap";
import { DataGrid } from '@mui/x-data-grid';
import '../src/Dashboard.css'
import {DialogContentText, Fab} from "@mui/material";
import {Form} from "react-bootstrap";

function Dashboard() {
    const [data, setData] = useState([]);

    const getEmployeeData = async () => {
        try {
            const requestOptions = {
                method: 'GET'
            }

            return fetch(
                'http://127.0.0.1:5000/users?minSalary=0&maxSalary=100000000&offset=0&limit=1000000&sort=%2Bid',
                requestOptions)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    const result = JSON.stringify(data['results'])
                    console.log((JSON.parse(result)));
                    return JSON.parse(result);
                })
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getEmployeeData().then(results => setData(results));
    }, []);

    const [showDelete, setShowDelete] = useState(false);
    const [deleteModalData, setDeleteModalData] = useState([]);
    const handleDelete = (id) => {
        handleCloseDelete();
        const requestOptions = {
            method: 'DELETE'
        }
        const endpoint = 'http://127.0.0.1:5000/users/'.concat(id);
        fetch(endpoint, requestOptions).then(response => response.json()
            .then(response => (response['success'] === true) ? console.log("TRUE!") : console.log("FALSE!")))
        refreshPage();
    };
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) => {
        setDeleteModalData(id);
        setShowDelete(true);
    }

    const DeleteModal = () => {
        return (
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Deleting {deleteModalData}...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="Primary" onClick={() => handleDelete(deleteModalData)}>
                        Yes
                    </Button>
                    <Button variant="Secondary" onClick={handleCloseDelete}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const [initialFormData, setInitialFormData] = useState({
        requestType: null,
        id: '',
        login: '',
        name: '',
        salary: 0,
    })

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        setInitialFormData({
            requestType: 0,
            id: '',
            login: '',
            name: '',
            salary: 0
        });
        setShowAdd(true);
    }
    
    const handleShowEdit = (params) => {
        console.log(params['row']['login']);
        setInitialFormData({
            requestType: 1,
            id: params['row']['id'],
            login: params['row']['login'],
            name: params['row']['name'],
            salary: params['row']['salary']
        });
        setShowAdd(true);
    }

    const EditEmployeeModal = () => {
        const [formData, updateFormData] = useState(initialFormData);
        const [showError, setShowError] = useState(false);
        const [errorBoxData, updateErrorBoxData] = useState("");

        const handleFailure = (error) => {
            updateErrorBoxData(error);
            setShowError(true);
        }

        const handleSuccess = () => {
            setShowError(false);
            refreshPage();
        }

        const handleChange = (e) => {
            updateFormData({
                ...formData,
                [e.target.id]: e.target.value.trim()
            })
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            if (showError) {
                setShowError(false);
            }
            let endpoint;
            let requestOptions;
            if (formData.requestType === 0) {
                requestOptions = {
                    method: 'POST'
                }
                endpoint = 'http://127.0.0.1:5000/users?id=' + formData.id + '&login=' + formData.login + '&name='
                    + formData.name + '&salary=' + formData.salary;
            } else if (formData.requestType === 1) {
                requestOptions = {
                    method: 'PUT'
                }
                endpoint = 'http://127.0.0.1:5000/users/' + formData.id + '?login=' + formData.login + '&name='
                    + formData.name + '&salary=' + formData.salary;
            }
            fetch(endpoint, requestOptions).then(response => response.json()
                .then(response => (response['success'] === true) ? handleSuccess() : handleFailure(response['error'])));
        }

        return (
            <Modal show={showAdd} onHide={handleCloseAdd} >
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant={"danger"} show={showError}>{errorBoxData}</Alert>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                type="text"
                                id="id"
                                defaultValue={initialFormData.id}
                                autoFocus
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Login:</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                type="text"
                                id="login"
                                defaultValue={initialFormData.login}
                                autoFocus
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                type="text"
                                id="name"
                                defaultValue={initialFormData.name}
                                autoFocus
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Salary:</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                type="number"
                                step="0.01"
                                id="salary"
                                defaultValue={initialFormData.salary}
                                autoFocus
                                required
                                min="0"
                            />
                        </Form.Group>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <DialogContentText value={errorBoxData}
                                               style={{padding: '8px', color: 'red'}}>
                            </DialogContentText>
                            <Button type="submit" variant="Primary">
                                Submit
                            </Button>
                            <Button variant="Secondary" onClick={handleCloseAdd}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

    function refreshPage() {
        window.location.reload();
    }

    const columns = [
        {field: "id", headerName: "ID", width: 90},
        {field: "login", headerName: "Login", width: 200},
        {field: "name", headerName: "Name", width: 200},
        {field: "salary", headerName: "Salary", width: 120},
        {field: "action", headerName: "Action", width: 160,
            renderCell: (params) => {
                return (
                    <>
                        <Button className='employeeEdit' onClick={() => handleShowEdit(params)} style={{
                            backgroundColor:"black",
                            color:"white",
                            borderColor:"white",
                            marginRight:'20px'}}>Edit</Button>
                        <Button className='employeeDelete' onClick={() => handleShowDelete(params.id)} style={{
                            backgroundColor:"red",
                            color:"white",
                            borderColor:"white"}}>Delete</Button>
                    </>
                )
            }
        }
    ]

    return (
        <div>
            <div style={{
                paddingLeft: '16px',
                paddingTop: '16px',
                fontWeight: 'bold',
                fontSize: "x-large"}}>Dashboard</div>
            <div className='employeeList'>
                <div>
                    <DeleteModal></DeleteModal>
                    <EditEmployeeModal></EditEmployeeModal>
                </div>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={30}
                />
                <Fab className="addButton" variant="extended" onClick={() => handleShowAdd()} style={{
                    backgroundColor:"black",
                    color:"white",
                    position:"fixed",
                    left: 'auto',
                    bottom: 75,
                    right: 30}}>
                    Add Employee
                </Fab>
            </div>
        </div>
    );
}

export default Dashboard;