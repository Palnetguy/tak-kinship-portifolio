import "../css/testimonial.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";
import configImages from "./configImages";
import configHeaders from "./config-headers";
import { useInView } from "react-intersection-observer";

const Testimonials = ({ setIsLoading }) => {
  // const testimonials = [
  //   {
  //     id: 1,
  //     name: "Masaba Ian Sam",
  //     role: "Programmer",
  //     content:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi? Possimus ipsa, excepturi praesentium dolore quae placeat voluptatem doloremque deserunt?",
  //   },
  //   {
  //     id: 2,
  //     name: "Masaba Ian Sam",
  //     role: "Programmer",
  //     content:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi? Possimus ipsa, excepturi praesentium dolore quae placeat voluptatem doloremque deserunt?",
  //   },
  //   {
  //     id: 3,
  //     name: "Masaba Ian Sam",
  //     role: "Programmer",
  //     content:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi? Possimus ipsa, excepturi praesentium dolore quae placeat voluptatem doloremque deserunt?",
  //   },
  //   {
  //     id: 4,
  //     name: "Masaba Ian Sam",
  //     role: "Programmer",
  //     content:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi? Possimus ipsa, excepturi praesentium dolore quae placeat voluptatem doloremque deserunt?",
  //   },
  //   {
  //     id: 4,
  //     name: "Masaba Ian Sam",
  //     role: "Programmer",
  //     content:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi? Possimus ipsa, excepturi praesentium dolore quae placeat voluptatem doloremque deserunt?",
  //   },
  //   {
  //     id: 4,
  //     name: "Masaba Ian Sam",
  //     role: "Programmer",
  //     content:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi? Possimus ipsa, excepturi praesentium dolore quae placeat voluptatem doloremque deserunt?",
  //   },
  //   {
  //     id: 4,
  //     name: "Masaba Ian Sam",
  //     role: "Programmer",
  //     content:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi? Possimus ipsa, excepturi praesentium dolore quae placeat voluptatem doloremque deserunt?",
  //   },
  //   {
  //     id: 4,
  //     name: "Masaba Ian Sam",
  //     role: "Programmer",
  //     content:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi? Possimus ipsa, excepturi praesentium dolore quae placeat voluptatem doloremque deserunt?",
  //   },
  //   {
  //     id: 4,
  //     name: "Masaba Ian Sam",
  //     role: "Programmer",
  //     content:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi? Possimus ipsa, excepturi praesentium dolore quae placeat voluptatem doloremque deserunt?",
  //   },
  //   // Add more testimonials as needed
  // ];

  const [testimonials, settestimonials] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // setIsLoading(true)
    const handleFetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `https://takkinship-backend.up.railway.app/api/testimonials/`,
          {
            headers: configHeaders,
          }
        );
        setIsLoading(false);
        settestimonials(response.data);
        console.log(response.data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    handleFetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024, // For tablets and larger screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // For phones and smaller screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [preTitleRef, preTitleInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [titleRef, titleInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [postTitleRef, postTitleInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [corocelRef, corocelInview] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="testimonials">
      <h4
        // className="pretitle"
        className={`pretitle titleNotSeen ${
          preTitleInview ? "titleInView" : ""
        }`}
        ref={preTitleRef}
      >
        TESTIMONIALS
      </h4>
      <h1
        // className="title"
        className={`title titleNotSeen ${titleInview ? "titleInView" : ""}`}
        ref={titleRef}
      >
        What People Say About Us
      </h1>
      <p
        // className=""
        className={`post-title titleNotSeen ${
          postTitleInview ? "titleInView" : ""
        }`}
        ref={postTitleRef}
      >
        At TAK, our client testimonials are like tech comedy gold. Get ready to
        LOL and see why our clients are the heroes of our digital blockbuster!.
        These aren't just reviews; they're love letters to innovation, sealed
        with the stamp of satisfaction
      </p>

      <div
        className="testimonialContainer"
        style={{ "--test": "3em" }}
        ref={corocelRef}
      >
        <Slider {...settings} className="testimonial-slider">
          {testimonials.map((testimonial) => (
            <div
              // className=""
              className={` containSlider titleNotSeen ${
                corocelInview ? "titleInView" : ""
              }`}
            >
              <div key={testimonial.id} className="singleTestimonial box">
                <div className="heading">
                  <div className="profileImg">
                    {/* Assuming you have the image URL for the profile */}
                    <img src={`${testimonial.user_photo}`} alt="" />
                  </div>
                  <div className="nameProf">
                    <h1 className="title-2">{testimonial.name}</h1>
                    <p>{testimonial.job_title}</p>
                  </div>
                </div>
                <div className="info">
                  <p>{testimonial.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
