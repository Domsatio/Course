import { Typography } from "@material-tailwind/react";
import React from "react";
import ContentWrapper from "@/layouts/client/contentWrapper";

interface CourseItem {
  year: string;
  title: string;
}

const courseItems: CourseItem[] = [
  { year: "2024", title: "Space Exploration" },
  { year: "2024", title: "Advanced Robotics" },
  { year: "2024", title: "Modern Architecture" },
  { year: "2024", title: "3D Printing for Experts" },
];

const HomeView = () => {
  return (
    <div className="pt-22">
      <header className="flex overflow-hidden justify-center items-center lg:px-96 py-36 whitespace-nowrap bg-black max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col justify-center items-center self-stretch my-auto lg:max-w-[1000px] min-w-[240px] lg:w-[1000px] max-md:max-w-full">
          <h1 className="text-white font-extrabold text-4xl lg:text-7xl bg-clip-text leading-[86.4px] max-md:max-w-full max-md:text-4xl">
            DOMCLUB
          </h1>
        </div>
      </header>
      <section className="w-full flex overflow-hidden justify-center items-center py-16 lg:py-24 px-5">
        <div className="flex justify-center items-center gap-5 flex-col lg:flex-row  lg:max-w-[935px]">
          <div className="lg:basis-1/2">
            <h2 className="text-5xl text-black font-bold">
              Embrace the Future of Learning
            </h2>
          </div>
          <div className="lg:basis-1/2">
            <p className="text-xl text-black">
              Step into our digital classroom and unlock limitless
              opportunities. Don't just learn, become a part of the future of
              education. Welcome to the modern renaissance era where learning
              and progress meet.
            </p>
          </div>
        </div>
      </section>
      <section className="flex overflow-hidden flex-col justify-center items-center lg:px-96 py-16 lg:py-24 px-5">
        <div className="flex flex-col w-full max-w-[1000px] max-md:max-w-full overflow-hidden">
          <div className="max-md:max-w-full">
            <div className="flex max-md:flex-col">
              <div className="flex flex-col bg-[#f2f2f2] w-[67%] max-md:ml-0 max-md:w-full">
                <StatCard
                  number="500+"
                  text="premium quality courses available."
                />
              </div>
              <div className="flex flex-col bg-[#f2f2f2] ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <ImageCard
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/563fc2f82929400afbd0083561fa0871a5d5fdef32011f937d8695d17ceaeaed?placeholderIfAbsent=true&apiKey=5dda444a603d48518e58263dc5959bda"
                  alt="Course illustration"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 max-md:max-w-full">
            <div className="flex max-md:flex-col">
              <div className="flex flex-col bg-[#f2f2f2] w-[33%] max-md:ml-0 max-md:w-full">
                <ImageCard
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fabc1e660a9d2500383e8f5cac1f7de7e61238c3cd3ac7b53d698361bb6e6cb5?placeholderIfAbsent=true&apiKey=5dda444a603d48518e58263dc5959bda"
                  alt="Product illustration"
                />
              </div>
              <div className="flex flex-col bg-[#f2f2f2] ml-5 w-[67%] max-md:ml-0 max-md:w-full">
                <StatCard
                  number="1000+"
                  text="unique products in our marketplace."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex overflow-hidden relative flex-col items-center lg:px-96 py-16 lg:py-24 bg-white px-5">
        <div className="flex absolute inset-0 z-0 bg-black opacity-50 min-h-[636px] max-md:max-w-full" />
        <div className="flex z-0 flex-col self-center w-full lg:w-[935px]">
          <h2 className="text-6xl text-black font-bold leading-[75.6px] max-md:max-w-full max-md:text-4xl">
            Extraordinary Features
          </h2>
          <div className="flex overflow-hidden flex-col justify-center mt-10 text-xl leading-8 max-w-[600px] text-sky-950 w-[600px] max-md:max-w-full">
            <p className="w-full">
              Dive into our vast collection of courses, meticulously crafted by{" "}
              <br /> experienced educators. We believe in edutainment, an
              engaging <br /> blend of education and entertainment.
            </p>
            <p className="mt-10 w-full">
              Apart from courses, you also get access to a variety of products
              that <br /> can take your learning to another level. From learning
              kits to tools <br /> and accessories, we've everything covered.
            </p>
            <p className="mt-10 w-full">
              Subscribe to unlock the wealth of knowledge. Damage the shackles{" "}
              <br /> of traditional learning, embrace the digital age.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center px-20 pt-44 pb-24 text-base leading-6 text-center bg-white text-slate-900 max-md:px-5 max-md:pt-24 max-md:max-w-full">
        <div className="flex flex-col items-center max-w-full w-[509px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/54dc50573ed938f5c0e1edfaced4f371b276a250174256d7a2b634143bb52687?placeholderIfAbsent=true&apiKey=5dda444a603d48518e58263dc5959bda"
            alt="Call to action illustration"
            className="object-contain max-w-full aspect-[3.34] stroke-[10px] stroke-slate-900 w-[167px]"
          />
          <h2 className="self-stretch mt-24 text-5xl font-bold leading-[60px] max-md:mt-10 max-md:max-w-full max-md:text-4xl">
            Ready to Discover?
          </h2>
          <p className="mt-7">
            Give your learning journey a powerful boost. Gear up to <br />{" "}
            become a part of the DomClub family. Click below –{" "}
          </p>
          <p className="mt-2.5">let's ignite the spark of knowledge.</p>
          <button className="self-stretch px-4 py-3 mt-6 text-sm leading-4 text-white bg-black rounded-lg min-h-[40px]">
            Register Now
          </button>
        </div>
      </section>
      <section className="flex overflow-hidden flex-col justify-center items-center lg:px-96 py-24 px-5">
        <div className="flex overflow-hidden flex-col justify-center max-w-full w-[1000px]">
          <h2 className="tracking-tight text-3xl lg:text-5xl leading-9 text-black font-bold">
            Featured Courses and Products
          </h2>
          <div className="flex overflow-hidden flex-col justify-center mt-5 w-full max-md:max-w-full text-xl md:text-2xl">
            {courseItems.map((item, index) => (
              <div
                key={index}
                className="flex overflow-hidden items-center flex-wrap gap-4 lg:gap-9 py-0.5 mt-2.5 w-full max-md:max-w-full"
              >
                <div className="leading-8 text-sky-950">
                  {item.year}
                </div>
                <div className="flex flex-wrap flex-auto gap-3 items-center leading-9 text-black">
                  <div className="grow self-stretch my-auto">{item.title}</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/af75d4b8cc7401d1bebdaf0ae6837ad07b9815ef8d3758c94875b8341b00cc8d?placeholderIfAbsent=true&apiKey=5dda444a603d48518e58263dc5959bda"
                    alt="Course icon"
                    className="object-contain shrink-0 self-stretch aspect-square w-[50px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex overflow-hidden flex-col justify-center items-center lg:px-96 py-24 text-black px-5">
        <div className="flex flex-wrap gap-10 justify-center max-w-full min-h-[480px] w-[1000px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f94b2ac746c3d0b4c9d42db94b0163e68e6bff78d1e5a5a0834971c0d7e8101a?placeholderIfAbsent=true&apiKey=5dda444a603d48518e58263dc5959bda"
            alt="Unlock new heights illustration"
            className="object-contain aspect-[0.98] min-w-[240px] w-[470px] max-md:max-w-full"
          />
          <div className="flex overflow-hidden flex-col flex-1 shrink items-start pr-16 my-auto basis-0 min-w-[240px] max-md:pt-24 max-md:max-w-full">
            <h2 className="text-3xl lg:text-7xl font-bold leading-10">
              Unlock New Heights
            </h2>
            <p className="mt-5 text-base leading-6">
              Witness the charisma of learning blended with state the art technology.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;

interface StatCardProps {
  number: string;
  text: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, text }) => {
  return (
    <div className="flex flex-col grow gap-5 justify-center items-center lg:py-24 px-5 lg:px-48 w-full bg-zinc-100 min-h-[320px] max-md:mt-5 max-md:max-w-full">
      <div className="text-5xl lg:text-7xl font-extrabold leading-[86.4px] text-slate-900 max-md:text-4xl">
        {number}
      </div>
      <div className="lg:mt-5 text-xl tracking-tight leading-8 text-center text-sky-950">
        {text}
      </div>
    </div>
  );
};

interface ImageCardProps {
  src: string;
  alt: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt }) => {
  return (
    <div className="flex flex-col justify-center items-center px-11 w-full aspect-square bg-zinc-100 min-h-[320px] max-md:px-5 max-md:mt-5">
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className="object-contain max-w-full aspect-square w-[232px]"
      />
    </div>
  );
};
