"use client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "@/components/Home";
import { useAdminContext } from "../components/AdminContext";
import ActividadDiez from "./ActividadDiez";
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
                                <li onClick={() => changeTab("ActividadOcho")}
                                    className={`nav-item mx-2 ${isTabActive("ActividadOcho")}`}>
                                    <button className="nav-link" aria-current="page">Actividad 8</button>
                                </li>
                                <li onClick={() => changeTab("Actividad10")}
                                    className={`nav-item mx-2 ${isTabActive("Actividad10")}`}>
                                    <button className="nav-link" aria-current="page">Actividad 10</button>
                                </li>
                                <li onClick={() => changeTab("ActividadOnce")}
                                    className={`nav-item mx-2 ${isTabActive("ActividadOnce")}`}>
                                    <button className="nav-link" aria-current="page">Actividad 11</button>
                                </li>
                                <li onClick={() => changeTab("LogIn")}
                                    className={`nav-item mx-2 ${isTabActive("LogIn")}`}>
                                    <button className="nav-link" aria-current="page">Actividad 12</button>
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
                        <button onClick={() => changeTab("ActividadOcho")} 
                                className={`nav-item list-group-item list-group-item-action py-2 ripple ${isTabActive("ActividadOcho")}`} >
                            Actividad 8
                        </button>
                        <button onClick={() => changeTab("Actividad10")} 
                                className={`nav-item list-group-item list-group-item-action py-2 ripple ${isTabActive("Actividad10")}`} >
                            Actividad 10
                        </button>
                        <button onClick={() => changeTab("ActividadOnce")} 
                                className={`nav-item list-group-item list-group-item-action py-2 ripple ${isTabActive("ActividadOnce")}`} >
                            Actividad 11
                        </button>
                        <button onClick={() => changeTab("LogIn")} 
                                className={`nav-item list-group-item list-group-item-action py-2 ripple ${isTabActive("LogIn")}`} >
                            Actividad 12
                        </button>
                    </ul>      
                </div>                  
            </div>

            <div className="">
                {activeTab === "Home" && <Home/>}
                {activeTab === "ActividadOcho" && <ActividadOcho />}
                {activeTab === "Actividad10" && <ActividadDiez />}
            </div>
        </div>
    )
}

