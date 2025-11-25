import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({children}){
    return(
        <div className="layout">
            <Navbar />
            <div className="main-content">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;