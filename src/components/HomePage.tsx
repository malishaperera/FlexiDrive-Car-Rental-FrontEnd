import Footer from "./home/Footer .tsx";
import {Hero} from "./home/Hero.tsx";
import {Header} from "./home/Header.tsx";
import {AboutUs} from "./home/AboutUs.tsx";
import {LatestCar} from "./home/LatestCar.tsx";


export function HomePage() {
    return (
        <div className="bg-[#f2fafe]h-[90px] min-h-screen w-screen ">

             {/*Header */}
            <Header/>
            {/* Hero Section */}
            <section id="hero-section">
                <Hero />
            </section>

            {/* Rent Car Section */}
            <section id="latest-section">
                <LatestCar />
            </section>

            {/* About Us Section */}
            <section id="about-section">
                <AboutUs />
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
