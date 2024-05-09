
import NavBar from "@/components/navBar";
import { Hero, ServiceSection, CompaniesSection, CallToActionSection, FooterSection } from "@/sections";

export default function Home() {
    return (
        <main className="min-h-screen">

            <NavBar />

            <section className='padding-x padding-b'>
               <Hero />
            </section>

            <section className='padding-x'>
                <ServiceSection />
            </section>

            <section className='padding'>
                <CompaniesSection />
            </section>

            <section className='padding'>
                <CallToActionSection />
            </section>

            <section className='padding'>
                <FooterSection />
            </section>
        </main>
    );
}