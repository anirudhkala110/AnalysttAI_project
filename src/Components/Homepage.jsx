import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Button from 'react-bootstrap/Button';
import Details from './Details';

const Homepage = () => {
    const [userdata, setUserdata] = useState([]);
    const [address, setAddress] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const USER_API_URL = 'http://localhost:8096/api/users';
    useEffect(() => {
        axios.get(USER_API_URL)
            .then(res => {
                setUserdata(res.data);
                setAddress(res.data.address);
                const defaultItemsPerPage = 3;
                const dataSize = res.data.length;
                const calculatedItemsPerPage = dataSize > defaultItemsPerPage ? defaultItemsPerPage : dataSize;
                setItemsPerPage(calculatedItemsPerPage);
            })
            .catch(err => {
                console.log(err);
                axios.get('https://jsonplaceholder.typicode.com/users')
                    .then(res => {
                        console.log('LocalHost is not working right now. . .')
                        setUserdata(res.data);
                        setAddress(res.data.address);
                        const defaultItemsPerPage = 3;
                        const dataSize = res.data.length;
                        const calculatedItemsPerPage = dataSize > defaultItemsPerPage ? defaultItemsPerPage : dataSize;
                        setItemsPerPage(calculatedItemsPerPage);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
    }, []);

    const [modalShow, setModalShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [changeColor, setChangecolor] = useState(null)
    // Function to show the modal for a specific user
    const handleShowModal = (user) => {
        setSelectedUser(user);
        setChangecolor(user.id)
        setModalShow(true);
    };

    const handleMissingData = (data) => {
        return data ? data : 'N/A';
    };

    const pageCount = Math.ceil(userdata.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;

    const currentPageData = userdata.slice(offset, offset + itemsPerPage);

    return (
        <div className='min-vh-100' style={{ background: "rgb(243 246 251)" }}>
            <div className='pt-4' style={{ background: "rgb(243 246 251)" }}>
                {userdata ? currentPageData.map((dataItem, index) => (
                    <div key={index} className={`text-decoration-none`} style={{ cursor: "pointer" }}>
                        <div className={`min-width-740 border py-5 px-3 mx-2 rounded rounded-4 mb-2 ${changeColor === dataItem.id ? 'bg-dark text-light' : 'bg-white'}`}>
                            <div>
                                <div className='fw-bold'>{handleMissingData(dataItem.username)}</div>
                                <div>&nbsp;</div>
                            </div>
                            <div>
                                <div className='fw-bold'>CONTACT</div>
                                <div> {handleMissingData(dataItem.name)}</div>
                            </div>
                            <div>
                                <div className='fw-bold'>CITY</div>
                                <div>{handleMissingData(dataItem.address.city)}</div>
                            </div>
                            <div>
                                <div className='fw-bold'>STATE</div>
                                <div> {handleMissingData(dataItem.address.state)}</div>
                            </div>
                            <Button variant="primary" onClick={() => handleShowModal(dataItem)}>
                                More. . .
                            </Button>
                        </div>
                    </div>
                )) : <div>Data Not present here. Backend error .</div>}
                {selectedUser && (
                    <Details
                        show={modalShow}
                        user={selectedUser}
                        onHide={() => setModalShow(false)}
                    />
                )}

            </div>
            <div class="navbar navbar-default navbar-fixed-bottom">
                <div class="container">
                    <ReactPaginate
                        className='pagination w-50'
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={'pagination'}
                        previousLinkClassName={'page-link rounded  shadow fw-bold'}
                        nextLinkClassName={'page-link rounded shadow fw-bold'}
                        disabledClassName={'disabled'}
                        activeClassName={'active'}
                    />
                </div>
            </div>

        </div>
    );
};

export default Homepage;
