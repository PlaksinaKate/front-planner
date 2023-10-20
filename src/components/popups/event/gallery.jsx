import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Arrow, Title } from '../../ui-kit';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import styles from './event.module.scss';
import { DEV_BACKEND_URL } from '../../../const';

export function Gallery({ photos }) {
  const [swiper, setSwiper] = useState(null);
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(0)
  const [isDisabledBtnPrev, setIsDisabledBtnPrev] = useState(false)
  const [isDisabledBtnNext, setIsDisabledBtnNext] = useState(false)

  const handleSwiperNext = () => swiper.slideNext()
  const handleSwiperPrev = () => swiper.slidePrev()

  useEffect(() => {
    if (swiperActiveIndex === 0) {
      setIsDisabledBtnPrev(true)
    } else {
      setIsDisabledBtnPrev(false)
    }
    
    if (swiper?.slides === undefined || swiperActiveIndex === swiper?.slides.length - 3) {
      setIsDisabledBtnNext(true)
    } else {
      setIsDisabledBtnNext(false)
    }
  }, [swiperActiveIndex])

  const photoSlides = photos?.map((item) => {
    return <SwiperSlide key={item.id} className={styles.galleryItem}>
      <img src={`${DEV_BACKEND_URL}${item.url}`} alt="" />
    </SwiperSlide>
  })

  return (
    <div className={styles.gallery}>
      <div className={clsx(styles.galleryHeaderWr, 'row', 'space-between', 'center')}>
        <Title small textLeft marginNone>Галерея</Title>
        <div className={styles.navigations}>
          <span id="swiper-back" className={styles.navigation} onClick={handleSwiperPrev}>
            <Arrow width={64} height={48} weight={4} fill disabled={isDisabledBtnPrev} />
          </span>
          <span id="swiper-next" className={styles.navigation} onClick={handleSwiperNext}>
            <Arrow right width={64} height={48} weight={4} fill disabled={isDisabledBtnNext} />
          </span>
        </div>
      </div>
      <div className={clsx(styles.galleryList)}>
        <Swiper
          spaceBetween={16}
          onSlideChange={() => setSwiperActiveIndex(swiper.activeIndex)}
          onSwiper={(s) => setSwiper(s)}
          navigation={{ nextEl: "#swiper-next", prevEl: "#swiper-back" }}
          pagination={{
            clickable: true
          }}
          modules={[Pagination]}
          className={styles.swiper}
          breakpoints={{
            1280: {
              slidesPerView: 3.5
            },
            900: {
              slidesPerView: 2.5
            },
            0: {
              slidesPerView: 1.5
            }
          }}
        >
          {photoSlides}
        </Swiper>
      </div>
    </div >
  );
}