import { Carousel } from 'antd';
import eCommerceStorySet from '../../assets/ecommerce.svg';
import marketStorySet from '../../assets/markets.svg';
import deliveryStorySet from '../../assets/delivery.svg';

export default function Header() {
  return (
    <div>
      {' '}
      <Carousel arrows className="bg-primary paddingX py-10">
        <CarouselSlide
          title={'A miscellaneous shopping experience.'}
          img={eCommerceStorySet}
        />
        <CarouselSlide
          title={'A miscellaneous shopping experience.'}
          imgWidth={550}
          img={marketStorySet}
        />
        <CarouselSlide
          title={'A miscellaneous shopping experience.'}
          img={deliveryStorySet}
        />
      </Carousel>
    </div>
  );
}

const CarouselSlide = ({ title, img, imgWidth = 350 }) => {
  return (
    <div className=" outline-none">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="slide-content flex flex-col gap-2 justify-center text-slate-950 text-center md:text-start order-last md:order-first">
          <h3 className="text-4xl md:text-2xl font-bold font-josefin-sans text-slate-900">
            MarketHive
          </h3>
          <h1 className="text-4xl md:text-6xl font-bold font-nunito">
            {title}
          </h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
            facere.
          </p>
        </div>
        <div className="slide-img">
          <img
            src={img}
            style={{ width: imgWidth }}
            className="my-auto mx-auto"
            alt="ecommerce storyset"
          />
        </div>
      </div>
    </div>
  );
};
