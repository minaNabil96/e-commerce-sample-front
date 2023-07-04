import React from "react";
import { register } from "swiper/element/bundle";

register();
const SwiperComponent = ({
  images,
  imagesStyle,
  auto,
  arrows,
  notSimple,
  slideNum,
}) => {
  const imagesMap =
    images &&
    images.map((image, idx) => (
      <swiper-slide key={idx}>
        <img className={imagesStyle} src={image} alt={`img`} />
      </swiper-slide>
    ));
  const notSimpleMap =
    notSimple &&
    notSimple.map((card, idx) => <swiper-slide key={idx}>{card}</swiper-slide>);
  return (
    <swiper-container
      autoplay={`${auto ? "true" : "false"}`}
      data-swiper-autoplay="3500"
      slides-per-view={`${slideNum ? slideNum : "1"}`}
      navigation={`${arrows ? "true" : "false"}`}
      pagination="true"
      pagination-dynamic-bullets="true"
    >
      {notSimpleMap ? notSimpleMap : imagesMap}
    </swiper-container>
  );
};

export default SwiperComponent;
