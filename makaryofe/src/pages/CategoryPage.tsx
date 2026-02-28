import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import type { Category } from "../types/type";
import apiClient from "../services/apiServices";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingSpinner from "../components/Loading";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    apiClient
      .get(`/category/${slug}`)
      .then((response) => {
        setCategory(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slug]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error Loading: {error}</p>;
  }

  if (!category) {
    return <p>Service not found</p>;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const BASE_URL = import.meta.env.VITE_REACT_API_STORAGE_URL;

  return (
    <main className="relative mx-auto flex w-full max-w-[640px] flex-col gap-[30px] overflow-x-hidden bg-white pb-[112px]">
      <div id="Background" className="absolute left-0 right-0 top-0">
        <img src="/assets/images/backgrounds/orange.png" alt="image" className="w-full h-[345px] object-cover object-bottom" />
      </div>
      <section
        id="NavTop"
        className={`fixed left-0 right-0 z-30 transition-all duration-300
           ${isScrolled ? "top-[30px]" : "top-[16px] "}`}
      >
        <div className="relative mx-auto max-w-[640px] px-5">
          <div
            id="ContainerNav"
            className={`flex items-center justify-between py-[14px] transition-all duration-300 
            ${isScrolled ? "bg-white rounded-[22px] px-[16px] shadow-[0px_12px_20px_0px_#0305041C]" : ""}
              `}
          >
            <Link to={`/`}>
              <div id="Back" className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white">
                <img src="/assets/images/icons/back.svg" alt="icon" className="h-[22px] w-[22px] shrink-0" />
              </div>
            </Link>
            <h2 id="Title" className="font-semibold text-white transition-all duration-300">
              Explore
            </h2>
            <Link to={`/cart`}>
              <div id="Cart" className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white">
                <img src="/assets/images/icons/cart.svg" alt="icon" className="h-[22px] w-[22px] shrink-0" />
              </div>
            </Link>
          </div>
        </div>
      </section>
      <header className="relative mx-auto mt-[100px] flex items-center gap-4">
        <img src={`${BASE_URL}/${category.photo}`} alt="icon" className="h-[70px] w-[70px] shrink-0" />
        <div>
          <h1 className="text-[26px] font-extrabold leading-[39px] text-white">{category.name}</h1>
          <p className="text-white">{category.home_services_count} Services</p>
        </div>
      </header>
      <section id="mostOrdered" className="relative space-y-[14px]">
        <h3 className="pl-5 text-[18px] font-bold leading-[27px] text-white">Most Ordered</h3>
        <div id="MostOrderedSlider" className="swiper w-full overflow-x-hidden">
          <Swiper className="swiper-wrapper " direction="horizontal" spaceBetween={20} slidesPerView="auto" slidesOffsetAfter={20} slidesOffsetBefore={20}>
            {category.popular_services.length > 0
              ? category.popular_services.map((service) => (
                  <SwiperSlide key={service.id} className="swiper-slide !w-fit">
                    <Link to={`/service/${service.slug}`} className="card">
                      <div className="relative flex w-[230px] shrink-0 flex-col gap-[12px] overflow-hidden rounded-[24px] border border-shujia-graylight bg-white p-4 transition-all duration-300 hover:border-shujia-orange">
                        <span className="absolute right-[26px] top-[26px] shrink-0 rounded-full bg-white px-2 py-[7px]">
                          <div className="flex items-center gap-[2px]">
                            <img src="/assets/images/icons/star.svg" alt="icon" />
                            <p className="text-xs font-semibold leading-[18px]">4.8</p>
                          </div>
                        </span>
                        <div className="flex h-[140px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#D9D9D9]">
                          <img src={`${BASE_URL}/${service.thumbnail}`} alt="image" className="h-full w-full object-cover" />
                        </div>
                        <h4 className="line-clamp-2 min-h-[48px] font-semibold">{service.name}</h4>
                        <div className="flex flex-col gap-y-3">
                          <div className="flex items-center gap-2">
                            <img src="/assets/images/icons/date.svg" alt="icon" className="h-5 w-5 shrink-0" />
                            <p className="text-sm leading-[21px] text-shujia-gray">{category.name}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <img src="/assets/images/icons/clock.svg" alt="icon" className="h-5 w-5 shrink-0" />
                            <p className="text-sm leading-[21px] text-shujia-gray">{service.duration} Hours</p>
                          </div>
                          <strong className="font-semibold text-shujia-orange">{formatCurrency(service.price)} </strong>
                          <img className="absolute bottom-0 right-0" src="/assets/images/backgrounds/decoration.svg" alt="icon" />
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              : "tidak ada data terbaru"}
          </Swiper>
        </div>
      </section>
      <section id="LatestServices" className="relative flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[14px]">
          <h3 className="pl-5 text-[18px] font-bold leading-[27px]">Latest Services</h3>
          {category.popular_services.length > 0
            ? category.popular_services.map((service) => (
                <Link to={`/service/${service.slug}`} key={service.id}>
                  <div className="mx-5 flex gap-3 rounded-[24px] border border-shujia-graylight bg-white p-4 transition-all duration-300 hover:border-shujia-orange">
                    <div className="flex h-[101px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-2xl">
                      <img src={`${BASE_URL}/${service.thumbnail}`} alt="image" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="line-clamp-2 min-h-[48px] font-semibold">{service.name}</h4>
                      <div className="flex items-center gap-2">
                        <img src="/assets/images/icons/clock.svg" alt="icon" className="h-5 w-5 shrink-0" />
                        <p className="text-sm leading-[21px] text-shujia-gray">{service.duration} Hours</p>
                      </div>
                      <strong className="font-semibold text-shujia-orange">{formatCurrency(service.price)}</strong>
                    </div>
                  </div>
                </Link>
              ))
            : "belum ada data terbaru"}
        </div>
      </section>
      <section id="Filter" className="fixed bottom-5 left-0 right-0 z-10 mx-auto w-full">
        <div className="mx-auto flex max-w-[640px] justify-center">
          <button type="button">
            <div className="mx-auto flex  rounded-full bg-shujia-orange px-[18px] py-[14px] transition-all duration-300 ">
              <img src="/assets/images/icons/filter.svg" alt="icon" />
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  const sortedServices = [...category.popular_services];

                  if (value === "termurah") {
                    sortedServices.sort((a, b) => a.price - b.price);
                  } else if (value === "termahal") {
                    sortedServices.sort((a, b) => b.price - a.price);
                  } else if (value === "durasi") {
                    sortedServices.sort((a, b) => a.duration - b.duration);
                  } else {
                    sortedServices.reverse();
                  }

                  setCategory({ ...category, popular_services: sortedServices });
                }}
                className="bg-shujia-orange text-white font-semibold  rounded-full text-sm focus:outline-none "
              >
                <option value="terbaru">Terbaru</option>
                <option value="termurah">Harga Termurah</option>
                <option value="termahal">Harga Termahal</option>
                <option value="durasi">Durasi Terpendek</option>
              </select>
            </div>
          </button>
        </div>
      </section>
    </main>
  );
}
