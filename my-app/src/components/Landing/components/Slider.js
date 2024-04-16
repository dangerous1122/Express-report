import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Slider() {
  return (
    <div style={{ backgroundColor: "#f8f8f8" }} className="-mt-4 py-16">
      <h1
        className={`md:text-4xl text-2xl font-bold text-center tracking-tight sm:text-4xl text-gray-900 mb-10`}
        style={{ backgroundColor: "#f8f8f8" }}
      >
        Testimonials from Customers
      </h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
        }}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <div className="h-56 bg-white  rounded-md my-12 shadow-md">
            <p className="text-center md:text-lg text-base px-10 py-5">
              It took me only 2 minutes to do my expenses. So now I spend my
              time looking out the window on the ferry ride back home.
            </p>
            <h3 className="text-center md:text-lg text-base">
              -Marcel B., Sales Rep
            </h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="h-56 bg-white  rounded-md my-12 shadow-md">
            <p className="text-center md:text-lg text-base px-10 py-5">
            As a floater pharmacist, I always dreaded this task. Now all I have to do is upload receipts and just watch it get done for me.


            </p>
            <h3 className="text-center md:text-lg text-base">
            -Matt Nguyen, Pharmacist

            </h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="h-56 bg-white  rounded-md my-12 shadow-md">
            <p className="text-center md:text-lg text-base px-10 py-5 ">
            this thing feels like a vending machine to get instant expense report made for me. Already told my colleagues about it.

            </p>
            <h3 className="text-center  md:text-lg text-base">
            -Charles S., Physician
            </h3>
          </div>
        </SwiperSlide>
        {/* ... more slides */}
      </Swiper>
    </div>
  );
}
