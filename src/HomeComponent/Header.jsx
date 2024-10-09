import { useEffect, useState } from 'react';
import { FaSearch, FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { Modal, Button, FormControl, ListGroup } from 'react-bootstrap';
import productsData from '../data/productsData';

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);  // toggle between login & register
    const [showDialog, setShowDialog] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showCartPage, setShowCartPage] = useState(false);

    const handleModalClose = () => {
        setShowModal(false);
        setIsLogin(true);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchInput(query);

        const filteredProducts = productsData.filter(product =>
            product.title.toLowerCase().includes(query)
        );
        setSuggestions(filteredProducts.length ? filteredProducts : [{ title: 'No products found' }]);
    };

    const handleCartClick = () => {
        setShowCartPage(true); // when cart icon clicks, show empty cart page.
        };

    const handleCartClose = () => {
        setShowCartPage(false); // Close the cart page.
        };

    const handleMouseEnter = () => {
        setShowDialog(true);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTimeout(() => {
            if (!isHovered) setShowDialog(false);
        }, 200);
    };

    const handleDialogButtonClick = () => {
        setShowDialog(false);
        setShowModal(true);
    };

    useEffect(()=>{
        const handleClickOutside=(e)=>{
            const cartPopup = document.querySelector('.cart-popup');
            const cartIcon = document.querySelector('.nav-link[title="Cart"]');
            if (showCartPage && cartPopup && !cartPopup.contains(e.target) && !cartIcon.contains(e.target)) {
                handleCartClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return() => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCartPage]);

    return (
        <>
            <header className="bg-black text-white">
                <nav className="d-flex justify-content-between align-items-center p-3">
                    <h1 className='navbar-brand'>TechShop</h1>
                   
                    <div className="d-flex justify-content-between align-items-center w-25 position-relative" style={{ gap: '30px' }}>
                      <div className='search-container'>
                        {showSearch && (
                            <div className="position-relative" 
                            style={{ 
                                top: '10px', 
                                width: '100%', 
                                margin: '0 auto',
                                display: 'flex',
                                justifyContent: 'flexstart' 
                            }}>
                                <FormControl
                                    type="text"
                                    value={searchInput}
                                    onChange={handleSearchChange}
                                    className="ml-5 bg-black text-white"
                                />
                                {searchInput && (
                                    <ListGroup className="position-absolute bg-black" style={{ zIndex: 1, top: '40px' }}>
                                        {suggestions.map((suggestion, index) => (
                                            <ListGroup.Item key={index} className="search-suggestion bg-black text-white">
                                                {suggestion.title}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </div>
                        )}
                      </div>
                    <div className="nav-link" data-toggle="tooltip" title="Search">
                            <FaSearch onClick={() => setShowSearch(!showSearch)} />
                        </div>

                        {/* cart icon functionality */}
                        <div className="nav-link ml-3" data-toggle="tooltip" title="Cart">
                            <FaShoppingCart onClick={handleCartClick} />
                        </div>

                        {/* User Icon and Dialog Box */}
                        <div className="nav-link"
                            data-toggle="tooltip"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <FaUserAlt />
                        </div>

                        {/* cart page display */}
                        {showCartPage && (
                            <div className='cart-popup'>
                            <div className='cart-page container my-3 text-danger'>
                                <h2>Cart is Empty</h2>
                                <FaShoppingCart size={200}/>
                            </div>
                            </div>
                        )}

                        {/* Persisting modal-dialog box */}
                        {showDialog && 
                        ( <div className="position-absolute dialog-box"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave} >
                            
                                <h4>Hello</h4>
                                <p>Access your account and manage orders.</p>
                                <div>
                                    <Button variant="primary" onClick={handleDialogButtonClick}>
                                        {isLogin ? 'Login' : 'Register'}
                                    </Button>
                                    <br />
                                    <p>Please Login</p>
                                </div>
                            </div>
                            
                        )}
                    </div>
                </nav>

                {/* Modal for login/signup */}
                <Modal show={showModal} onHide={handleModalClose} className="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>{isLogin ? 'Login' : 'Register'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isLogin ? (
                            <>
                                <FormControl type="email" placeholder="Enter email" className="mb-3" />
                                <FormControl type="password" placeholder="Enter password" className="mb-3" />
                            </>
                        ) : (
                            <>
                                <FormControl type="text" placeholder="Enter username" className="mb-3" />
                                <FormControl type="email" placeholder="Enter email" className="mb-3" />
                                <FormControl type="password" placeholder="Enter password" className="mb-3" />
                                <FormControl type="password" placeholder="Confirm password" className="mb-3" />
                                <FormControl type="text" placeholder="Enter mobile number" className="mb-3" />
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <Button variant="secondary" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Register' : 'Login'}
                        </Button>
                        <Button variant="primary" onClick={handleModalClose}>
                            {isLogin ? 'Login' : 'Register'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </header>
        </>
    );
};

export default Header;
