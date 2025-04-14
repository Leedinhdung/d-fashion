import Footer from "./Footer"
import Header from "./Header"


const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default ClientLayout