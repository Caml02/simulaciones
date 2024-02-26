import Image from "next/image";
import ProgrammingImage from "@/img/programImage.svg"
import Footer from "./Footer";

const Home = () => {
    return (
        <div>
            <div className="pt-5 text-center container mb-0">
                <h1 className="pt-5 text-uppercase fw-bold">Simulaciones</h1>
                <div className="row ">
                    <div className="card border-0 col-md-6">
                        <h5 className="card-title fw-bold">Sobre Este proyecto</h5>
                        <div className="card-body text-start">
                            <p className="card-text">Este proyecto es un repositorio de actividades las cuales de ayudarán
                            a realizar simulaciones de casos especificos. Las actividades las puedes encontrar navegando hacia ellas atraves de la barra de navegacion en la parte
                            superior de esta pagina. <span className="fw-bold">Actividad 8</span>, <span className="fw-bold">Actividad 10</span>, y el resto de ellas corresponden al programa
                            de la materia <span className="fw-bold">Simulacion de Sistemas</span> de la carrera: Ingeniería en Software.</p>
                            <p>Si quieres ver mas a fondo como se realizaron las simulaciones te dejo el codigo aqui:</p>
                            <a className="text-muted text-decoration-none" href="https://github.com/Caml02/simulaciones" target="blank">Codigo Fuente</a>
                        </div>
                    </div>

                    <div className="card border-0 col-md-6">
                        <div className="card-body">
                            <Image
                                src={ProgrammingImage}
                                alt="Section 2"
                                width={450}
                                height={450}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;