import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Details(props) {
    const { user } = props;
    const [userData, setUserData] = useState([]);
    const [address, setAddress] = useState([]);
    const USER_API_URL = 'http://localhost:8096/api/users';
    useEffect(() => {
        axios.get(`${USER_API_URL}/${user.id}`)
            .then(res => {
                setUserData(res.data);
                setAddress(res.data.address);
            })
            .catch(err => {
                console.log(err);
                console.log('Localhost is not working right now. . .')
                axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}`)
                    .then(res => {
                        setUserData(res.data);
                        setAddress(res.data.address);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
    }, [user.id]);

    const getPhoneNumberWithoutExtension = (phone) => {
        if (phone) {
            const parts = phone.split('x');
            return parts[0].trim();
        }
        return 'N/A';
    };

    const handleMissingData = (data) => {
        return data ? data : 'N/A';
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div>
                        <div>Hello &nbsp;</div>
                        <div className='fw-bold'>{handleMissingData(userData.username)}</div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex justify-content-between my-4 align-items-center px-3'>
                    <div>
                        <div className='fw-bold'>CONTACT</div>
                        <div> {handleMissingData(userData.name)}</div>
                    </div>
                    <div>
                        <div className='fw-bold'>CITY</div>
                        <div>{handleMissingData(address.city)}</div>
                    </div>
                    <div>
                        <div className='fw-bold'>STATE</div>
                        <div> {handleMissingData(address.state)}</div>
                    </div>
                </div>
                <div className='rounded shadow px-4 py-3'>
                    <div className='mb-4 px-2'>
                        <div className='card-title fw-bold'>Description</div>
                        <div className='card-text'>
                            {handleMissingData(userData.description)}
                        </div>
                    </div>
                    <div className='d-flex justify-content-between '>
                        <div className='me-5'>
                            <div className='mb-4'>
                                <div className='fw-bold'>Contact Person</div>
                                <div>{handleMissingData(userData.name)}</div>
                            </div>
                            <div className='mb-4'>
                                <div className='fw-bold'>Designation</div>
                                <div>Designation of the Person</div>
                            </div>
                            <div className='mb-4'>
                                <div className='fw-bold'>Email</div>
                                <div>{handleMissingData(userData.email)}</div>
                            </div>
                            <div className='mb-4'>
                                <div className='fw-bold'>Phone</div>
                                <div>{handleMissingData(getPhoneNumberWithoutExtension(userData.phone))}</div>
                            </div>
                        </div>
                        <div className='me-5'>
                            <div className='mb-4'>
                                <div className='fw-bold'>Address</div>
                                <div>{handleMissingData(address.suite)} {handleMissingData(address.street)} {handleMissingData(address.city)} {handleMissingData(address.zipcode)}</div>
                            </div>
                            <div className='mb-4'>
                                <div className='fw-bold'>City</div>
                                <div>{handleMissingData(address.city)}</div>
                            </div>
                            <div className='mb-4'>
                                <div className='fw-bold'>State</div>
                                <div>{handleMissingData(address.state)}</div>
                            </div>
                            <div className='mb-4'>
                                <div className='fw-bold'>Country</div>
                                <div>{handleMissingData(address.country)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className='btn btn-danger'>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Details;
