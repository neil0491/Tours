import SwiperCore, { Navigation, Swiper } from "swiper/core";
SwiperCore.use([Navigation]);
import "swiper/swiper-bundle.css";

const swiper = new Swiper(".carousel", {
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
    1390: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
  navigation: {
    nextEl: ".carousel__btn--next",
    prevEl: ".carousel__btn--prev",
  },
});

const swiperDeals = new Swiper(".deals__swiper", {
  slidesPerView: 1,
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1390: {
      slidesPerView: 4,
    },
  }
});
