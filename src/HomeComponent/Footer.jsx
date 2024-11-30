import React,{useState, useEffect} from 'react';
import servicesData from '../data/servicesData';
import { footMenu, footSocial } from '../data/footerData';

const Footer = () => {
    const [showTopArrow, setShowTopArrow] = useState(false);

    // Show or hide the top-arrow based on scroll position
    useEffect(() => {
        const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowTopArrow(true);
        } else {
            setShowTopArrow(false);
        }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return(
    <footer className="bg-dark text-white pt-5 bg-black">
        <div className="d-flex flex-column justify-content-center align-items-center text-center mb-4">
            <h4 className='text-center mb-4'> Our Advantages</h4>
            <div className='d-flex flex-wrap justify-content-center'>
             {servicesData.map(service => (
                <div key={service.id} className="p-3" style={{ flex: "0 1 25%" }}>
                    <span className='text-danger'>{service.icon}</span>
                    <h5>{service.title}</h5>
                    <p>{service.info}</p> 
                   
                    
                </div>
            ))}
            </div>
            
        </div>
        <div className="d-flex flex-wrap justify-content-around text-center">
            {footMenu.map(menu => (
                <div key={menu.id} className="p-3" style={{ flex: "0 1 30%" }}>
                    <h5>{menu.title}</h5>
                    <ul className="list-unstyled">
                        {menu.menu.map(item => (
                            <li key={item.id} className="text-white">{item.link}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        <hr />
        
            
        
        <div className="footerIcons">
          <h4 className='copyRightInfo'>2024 | All Rights Reserved | Akhil Pendlimarry</h4>
            <div className='iconContainer'>
                {footSocial.map(social => (
                    <span key={social.id} className="mx-2 text-white">
                        {social.icon}
                    </span>
            ))}
            </div>
        </div>    
        {/* Top-Arrow Icon */}
      {showTopArrow && (
        <div
          onClick={scrollToTop}
          className="top-arrow" >
          <i className="fa-solid fa-arrow-up"></i>
        </div>
      )}
    </footer>
);
};

export default Footer;
