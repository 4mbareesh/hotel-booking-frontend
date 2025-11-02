import { CheckIcon } from "lucide-react";
import Image from "next/image";
import landingImage from "../../../../public/home/landing.jpg";
import HotelBookingForm from "./form";

function LandingSection() {
  return (
    <section className="relative flex max-h-full min-h-screen items-center">
      <Image
        src={landingImage}
        alt="Luxury Hotel Interior"
        className="object-cover object-center"
        fill
        priority
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="mb-6 font-bold text-4xl text-white leading-tight sm:text-5xl lg:text-6xl">
              Experience Luxury
              <span className="block text-blue-400">at BookMyStay</span>
            </h1>
            <p className="mb-6 text-gray-200 text-xl leading-relaxed">
              Discover exceptional accommodations worldwide. From boutique
              hotels to luxury resorts, find your perfect getaway with unmatched
              comfort and service.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <div className="flex items-center text-white">
                <CheckIcon className="mr-2 h-5 w-5 text-green-400" />
                Instant Booking
              </div>
              <div className="flex items-center text-white">
                <CheckIcon className="mr-2 h-5 w-5 text-green-400" />
                Best Price Guarantee
              </div>
              <div className="flex items-center text-white">
                <CheckIcon className="mr-2 h-5 w-5 text-green-400" />
                24/7 Support
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-2xl bg-background/90 p-6 shadow-2xl backdrop-blur-sm lg:p-8">
              <div className="mb-6 text-center">
                <h3 className="mb-2 font-bold text-2xl text-foreground">
                  Book Your Stay
                </h3>
                <p className="text-muted-foreground">
                  Find and reserve your perfect room
                </p>
              </div>
              <HotelBookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingSection;
