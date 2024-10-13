import { useState } from 'react';
import '../../assets/scss/Header.scss'
import { Link, useNavigate } from 'react-router-dom';
import { image0 } from '../../assets/img/panner';

export default function Header() {
    const navigate = useNavigate()
    const [, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login')
    };
    return (
        <div className="header-wrapper row ">
            {/* <div className="px-2 d-flex gap-2">
                <img src={image0} alt='image-none' style={{width: 'auto', height:'40px'}} className='ms-3'/>
                <h2 className="h3 ">NKN</h2>    
            </div> */}
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid navbar-inner px-4 ">
                    {/* <img src={imagelg03} alt='image-none' style={{ width: 'auto', height: '40px' }} /> */}
                    <Link class="navbar-brand text-white py-3 gap-5 justify-content-center " href="/">Trang chủ</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <button className='btn ms-auto text-white border border-white me-2' onClick={() => handleLogout()}>Logout</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}
