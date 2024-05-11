
import NavBar from "@/components/navBar";
import { Hero, ServiceSection, CompaniesSection, ReviewsSection, CallToActionSection, FooterSection } from "@/sections";

export default function Home() {
    return (
        <main className="relative">

            <NavBar />

            <section className='xl:padding-l wide:padding-r padding-b'>
               <Hero />
            </section>

            <section className='padding-x padding-b'>
                <ServiceSection />
            </section>

            <section className='padding-x padding-b'>
                <CompaniesSection />
            </section>

            <section className='padding-x padding-b'>
                <ReviewsSection />
            </section>

            <section className='bg-blue-50 padding-x sm:py-32 py-16 w-full'>
                <CallToActionSection />
            </section>

            <section className='padding-x padding-t pb-8'>
                <FooterSection />
            </section>
        </main>
    );
}