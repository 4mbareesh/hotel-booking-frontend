import Image from "next/image";
import landingImage from "../../../../public/home/landing.jpg";
import HotelBookingForm from "./form";

function LandingSection() {
  return (
    <section className="relative min-h-screen">
      <Image
        src={landingImage}
        alt="Landing Image"
        className="object-cover"
        fill
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 flex">
        <div className="flex h-full w-1/2 items-center bg-red">
          <h1 className="max-w-sm ps-8 font-semibold text-4xl text-gray-200 text-shadow-black text-shadow-lg/50">
            Welcome to Hotel Booking System
          </h1>
        </div>
        <div className="flex h-full w-1/2 items-center justify-center bg-red">
          <div className="max-w-md flex-1 rounded-xl bg-background p-4">
            <h3 className="mb-3 text-center font-semibold text-lg">
              Book Your Stay
            </h3>
            <HotelBookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingSection;
