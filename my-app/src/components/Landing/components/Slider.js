import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Slider() {
  return (
    <div style={{backgroundColor:'#f8f8f8'}} className='-mt-4 py-16'>
      <h1 className={`text-4xl font-bold text-center tracking-tight sm:text-4xl text-gray-900 mb-10`} style={{backgroundColor:'#f8f8f8'}}>
        Testimonials from Customers
      </h1>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        // initial number of slides per view
        slidesPerView={3}
        // settings for different breakpoints
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
          },
        }}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
      
        <SwiperSlide>
          <div className='h-44 bg-white  rounded-md my-12'></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='h-44 bg-white  rounded-md my-12'></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='h-44 bg-white rounded-md my-12'></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='h-44 bg-white rounded-md my-12'></div>
        </SwiperSlide>
        {/* ... more slides */}
      </Swiper>
    </div>
  );
}
