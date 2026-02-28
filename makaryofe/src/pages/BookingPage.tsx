import React, { useEffect, useState } from "react";
import type { BookingFormData } from "../types/type";

import AccordionSection from "../components/AccordionSection";
import { Link, useNavigate } from "react-router-dom";
import { bookingSchema } from "../types/validationBooking";
import type z from "zod";

export default function BookingPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    started_time: "",
    schedule_at: "",
    post_code: "",
    address: "",
    city: "",
  });

  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("bookingData");
    const cartData = localStorage.getItem("cart");
    if (!cartData || JSON.parse(cartData).length === 0) {
      navigate("/");
      return;
    }
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [navigate]);

  const cities = ["London", "Bright", "Manchester", "Barcelona", "Indonesia", "Bandung", "Garut", "Jogja"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log(tomorrow);

    const formattedDate = tomorrow.toISOString().split("T")[0];

    setFormData((prev) => ({
      ...prev,
      schedule_at: formattedDate,
    }));

      const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = bookingSchema.safeParse(formData);

    if (!validation.success) {
      setFormErrors(validation.error.issues);
      return;
    }

    localStorage.setItem("bookingData", JSON.stringify(formData));
    alert("Booking information Saved");

    navigate("/payment");

    setFormErrors([]);
  };

  return (
    <main className="relative mx-auto w-full max-w-[640px] overflow-x-hidden bg-white pb-[144px]">
      <div id="Background" className="absolute left-0 right-0 top-1 h-[228px]">
        <img src="/assets/images/backgrounds/orange-service-details.png" alt="image" />
      </div>
      <section
        id="NavTop"
        className={`fixed left-0 right-0 z-30 transition-all duration-300
           ${isScrolled ? "top-[30px]" : "top-[16px] "}`}
      >
        <div className="relative mx-auto max-w-[640px] px-5">
          <div
            id="ContainerNav"
            className={`flex items-center justify-between py-[14px] tr  ansition-all duration-300 
            ${isScrolled ? "bg-white rounded-[22px] px-[16px] shadow-[0px_12px_20px_0px_#0305041C]" : ""}
              `}
          >
            <Link to={`/`}>
              <div
                id="Back"
                className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white
                ${isScrolled ? "border border-shujia-graylight" : ""}`}
              >
                <img src="/assets/images/icons/back.svg" alt="icon" className="h-[22px] w-[22px] shrink-0" />
              </div>
            </Link>
            <h2
              id="Title"
              className={`font-semibold  transition-all duration-300
              ${isScrolled ? "" : "text-white"} 
              `}
            >
              Booking Services
            </h2>
            <div className="h-[44px] w-[44px]" />
          </div>
        </div>
      </section>
      <section id="ProgressBar" className="relative px-5 pt-[92px]">
        <div className="flex">
          <div className="flex flex-col items-center">
            <div className="relative z-10 flex h-[25px] items-center">
              <div className="h-2 w-[60px] rounded-full bg-white" />
              <div className="absolute right-0 top-0 translate-x-1/2">
                <div className="flex flex-col items-center gap-[6px]">
                  <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white text-xs font-bold leading-[18px]">1</div>
                  <p className="text-xs font-semibold leading-[18px] text-white">Booking</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex h-[25px] w-full items-center">
            <div className="h-2 w-full rounded-full bg-[#E68B6D]" />
            <div className="absolute right-1/2 top-0 translate-x-1/2">
              <div className="flex flex-col items-center gap-[6px]">
                <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#FFBFA9] text-xs font-bold leading-[18px] text-[#C2836D]">2</div>
                <p className="text-xs font-semibold leading-[18px] text-[#FFBFA9]">Payment</p>
              </div>
            </div>
          </div>
          <div className="relative z-10 flex h-[25px] w-[60px] items-center">
            <div className="h-2 w-[60px] rounded-full bg-[#E68B6D]" />
            <div className="absolute left-0 top-0 -translate-x-1/2">
              <div className="flex flex-col items-center gap-[6px]">
                <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#FFBFA9] text-xs font-bold leading-[18px] text-[#C2836D]">3</div>
                <p className="text-xs font-semibold leading-[18px] text-[#FFBFA9]">Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative mt-[44px] flex flex-col px-5 pb-5">
        <form onSubmit={handleSubmit}>
          <header className="flex flex-col gap-[2px]">
            <h1 className="text-[26px] font-extrabold leading-[39px] text-white">Start Booking</h1>
            <p className="text-white">Lorem dolor si amet data asli</p>
          </header>
          <div className="mt-[20px] flex flex-col gap-5">
            <AccordionSection title="Working Schedule" iconSrc="/assets/images/icons/bottom-booking-form.svg">
              <div id="WorkingScheduleJ" className="flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Date</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight">
                    <img src="/assets/images/icons/date-booking-form.svg" alt="icon" className="absolute left-[14px] top-1/2 h-6 w-6 shrink-0 -translate-y-1/2" />
                    <input value={formData.schedule_at} name="schedule_at" onChange={handleChange} required className="h-full w-full rounded-full bg-[#F4F5F7] pl-[50px] font-semibold focus:outline-none" readOnly type="text" />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Start Time At</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange">
                    <img src="/assets/images/icons/clock-booking-form.svg" alt="icon" className="absolute left-[14px] top-1/2 h-6 w-6 shrink-0 -translate-y-1/2" />
                    <select value={formData.started_time} name="started_time" onChange={handleChange} id="" className="h-full w-full appearance-none rounded-full bg-transparent relative z-10 pl-[50px] font-semibold focus:outline-none">
                      <option value="">Enter the time</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                    </select>
                    {formErrors.find((error) => error.path.includes("started_time")) && <p className="">{formErrors.find((error) => error.path.includes("started_time"))?.message}</p>}
                  </div>
                </label>
              </div>
            </AccordionSection>
            <AccordionSection title="Personal Informations" iconSrc="/assets/images/icons/bottom-booking-form.svg">
              <div className="flex flex-col gap-4" id="PersonalInformationsJ">
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Full Name</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange">
                    <img src="/assets/images/icons/profil-booking-form.svg" alt="icon" className="absolute left-[14px] top-1/2 h-6 w-6 shrink-0 -translate-y-1/2" />
                    <input
                      value={formData.name}
                      name="name"
                      onChange={handleChange}
                      required
                      className="h-full w-full rounded-full pl-[50px] font-semibold leading-6 placeholder:text-[16px] placeholder:font-normal placeholder:text-shujia-gray focus:outline-none"
                      placeholder="Write your complete name"
                      type="text"
                    />

                    {formErrors.find((error) => error.path.includes("name")) && <p className="">{formErrors.find((error) => error.path.includes("name"))?.message}</p>}
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Email Address</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange">
                    <img src="/assets/images/icons/amplop-booking-form.svg" alt="icon" className="absolute left-[14px] top-1/2 h-6 w-6 shrink-0 -translate-y-1/2" />
                    <input
                      value={formData.email}
                      name="email"
                      onChange={handleChange}
                      required
                      className="h-full w-full rounded-full pl-[50px] font-semibold leading-6 placeholder:text-[16px] placeholder:font-normal placeholder:text-shujia-gray focus:outline-none"
                      placeholder="Write your email"
                      type="email"
                    />
                    {formErrors.find((error) => error.path.includes("email")) && <p className="">{formErrors.find((error) => error.path.includes("email"))?.message}</p>}
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">No. Phone</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange">
                    <img src="/assets/images/icons/telepon-booking-form.svg" alt="icon" className="absolute left-[14px] top-1/2 h-6 w-6 shrink-0 -translate-y-1/2" />
                    <input
                      value={formData.phone}
                      name="phone"
                      onChange={handleChange}
                      type="tel"
                      required
                      className="h-full w-full rounded-full pl-[50px] font-semibold leading-6 placeholder:text-[16px] placeholder:font-normal placeholder:text-shujia-gray focus:outline-none"
                      placeholder="Write your active number"
                    />
                    {formErrors.find((error) => error.path.includes("phone")) && <p className="">{formErrors.find((error) => error.path.includes("phone"))?.message}</p>}
                  </div>
                </label>
              </div>
            </AccordionSection>
            <AccordionSection title="Your Home Address" iconSrc="/assets/images/icons/bottom-booking-form.svg">
              <div id="YourHomeAddressJ" className="flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Address</h4>
                  <div className="relative h-[110px] w-full overflow-hidden rounded-[22px] border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange">
                    <textarea
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your complete address"
                      required
                      className="h-full w-full pl-[50px] pr-[14px] pt-[14px] font-semibold leading-7 placeholder:text-[16px] placeholder:font-normal placeholder:text-shujia-gray focus:outline-none"
                      name="address"
                      id=""
                    />
                    {formErrors.find((error) => error.path.includes("adress")) && <p className="">{formErrors.find((error) => error.path.includes("adress"))?.message}</p>}
                    <img src="/assets/images/icons/school-booking-form.svg" alt="icon" className="absolute left-[14px] top-[14px] h-6 w-6 shrink-0" />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">City</h4>
                  {formErrors.find((error) => error.path.includes("city")) && <p className="">{formErrors.find((error) => error.path.includes("city"))?.message}</p>}
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange">
                    <img src="/assets/images/icons/location-booking-form.svg" alt="icon" className="absolute left-[14px] top-1/2 h-6 w-6 shrink-0 -translate-y-1/2" />
                    <select value={formData.city} onChange={handleChange} name="city" id="" className="h-full w-full appearance-none rounded-full bg-transparent relative z-10 pl-[50px] font-semibold focus:outline-none">
                      <option value="">Enter the city name</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <img src="/assets/images/icons/bottom-select.svg" alt="icon" className="absolute right-[14px] top-1/2 h-6 w-6 shrink-0 -translate-y-1/2" />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <h4 className="font-semibold">Post Code</h4>
                  <div className="relative h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange">
                    <img src="/assets/images/icons/ball-booking-form.svg" alt="icon" className="absolute left-[14px] top-1/2 h-6 w-6 shrink-0 -translate-y-1/2" />
                    <input
                      value={formData.post_code}
                      name="post_code"
                      onChange={handleChange}
                      required
                      className="post-code h-full w-full rounded-full pl-[50px] font-semibold leading-6 placeholder:text-[16px] placeholder:font-normal placeholder:text-shujia-gray focus:outline-none"
                      placeholder="What’s your postal code"
                      type="tel"
                    />
                    {formErrors.find((error) => error.path.includes("post_code")) && <p className="">{formErrors.find((error) => error.path.includes("post_code"))?.message}</p>}
                  </div>
                </label>
              </div>
            </AccordionSection>
          </div>
          <button type="submit" className="mt-[44px] w-full rounded-full bg-shujia-orange py-[14px] font-semibold text-white transition-all duration-300 hover:shadow-[0px_4px_10px_0px_#D04B1E80]">
            Continue to Payment
          </button>
        </form>
      </div>
    </main>
  );
}
