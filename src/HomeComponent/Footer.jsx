import servicesData from '../data/servicesData';
import { footMenu, footSocial } from '../data/footerData';

const Footer = () => (
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
        <div className="text-center my-4">
            {footSocial.map(social => (
                <span key={social.id} className="mx-2 text-white">
                    {social.icon}
                </span>
            ))}
        </div>
    </footer>
);

export default Footer;
