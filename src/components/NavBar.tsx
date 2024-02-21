"use client";
import { useAdminContext } from "../components/AdminContext";
import ActividadOcho from "./ActividadOcho";

 export default function NavBar() {
    
    const { activeTab, changeTab } = useAdminContext();
    const isTabActive = (tabName: string) => {
        return tabName === activeTab ? "activeLink" : "";
    };


    return (
        <div>
            <nav id="navBar" className="navbar navbar-expand-lg bg-black fixed-top border-bottom" data-bs-theme="dark">
                <div className="container">
                    <a className="navbar-brand mb-0" href="/">
                        <h2 className="TitleLogo"> Cristian A. Morales </h2>
                    </a>

                    <div className="d-flex align-items-center m-2 ">
                        <button id="toggle-list" className="btn d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offCanvaNavBar" aria-controls="offCanvaNavBar">
                            <i className="bi bi-list"></i>
                        </button>
                        <div className="d-lg-flex collapse ">
                            <ul className="navbar-nav me-auto my-lg-0 ">
                                <li onClick={() => changeTab("Home")}
                                    className={`nav-item mx-2 ${isTabActive("Home")}`}>
                                    <button className="nav-link" aria-current="page">Home</button>
                                </li>
                                <li onClick={() => changeTab("Actividad8")}
                                    className={`nav-item mx-2 ${isTabActive("Actividad8")}`}>
                                    <button className="nav-link" aria-current="page">Actividad 8</button>
                                </li>
                                <li onClick={() => changeTab("Actividad10")}
                                    className={`nav-item mx-2 ${isTabActive("Actividad10")}`}>
                                    <button className="nav-link" aria-current="page">Actividad 10</button>
                                </li>
                                <li onClick={() => changeTab("Services")}
                                    className={`nav-item mx-2 ${isTabActive("Services")}`}>
                                    <button className="nav-link" aria-current="page">Services</button>
                                </li>
                                <li onClick={() => changeTab("LogIn")}
                                    className={`nav-item mx-2 ${isTabActive("LogIn")}`}>
                                    <button className="nav-link" aria-current="page">Log In</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex={-1} id="offCanvaNavBar" aria-labelledby="offCanvaNavBarLabel">
                <div className="offcanvas-header">
                    <h2 className="offcanvas-title" id="offCanvaNavBarLabel">Full Circle Industries </h2>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div id="sidebar-offcanvas" className="offcanvas-body">  
                    <ul className='list-group list-group-flush mx-3 mt-4'>
                    <button onClick={() => changeTab("Home")} 
                                className={`nav-item list-group-item list-group-item-action py-2 ripple ${isTabActive("Home")}`} >
                            Home
                        </button>
                        <button onClick={() => changeTab("AboutUs")} 
                                className={`nav-item list-group-item list-group-item-action py-2 ripple ${isTabActive("AboutUs")}`} >
                            About Us
                        </button>
                        <button onClick={() => changeTab("Store")} 
                                className={`nav-item list-group-item list-group-item-action py-2 ripple ${isTabActive("Store")}`} >
                            Store
                        </button>
                        <button onClick={() => changeTab("Services")} 
                                className={`nav-item list-group-item list-group-item-action py-2 ripple ${isTabActive("Services")}`} >
                            Services
                        </button>
                        <button onClick={() => changeTab("LogIn")} 
                                className={`nav-item list-group-item list-group-item-action py-2 ripple ${isTabActive("LogIn")}`} >
                            Login
                        </button>
                    </ul>      
                </div>                  
            </div>

            <div className="">
                {activeTab === "Actividad8" && <ActividadOcho />}
            </div>
        </div>
    )
}

