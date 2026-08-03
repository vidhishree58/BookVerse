import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen w-full flex bg-[#0b0c16] text-white items-center pt-5 pb-18
     px-6 md:px-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Left Text */}
        <div className="order-2 md:order-1 flex flex-col items-start gap-6">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
            Welcome to <br />
            <span className="text-[#7808be]">BookVerse</span>
          </h1>

          <div className="space-y-6 max-w-xl">
            <div className="text-gray-200 text-xl sm:text-2xl italic leading-10">
              <p>“Some stories stay with us forever.</p>
              <p>Some characters become family.</p>
              <p>And some books quietly change who we are.”</p>
            </div>

            <p className="text-gray-300 text-base sm:text-lg leading-8">
              BookVerse is your personal reading companion—a place to discover
              meaningful books, share your thoughts through reviews, keep track
              of your reading journey, and connect with readers who believe
              every story deserves to be remembered and shared.
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="order-1 md:order-2 flex justify-center items-center w-full">
          <img
            src="/assets/Library.jpg"
            alt="BookVerse Library"
            className="w-full max-w-lg h-auto object-cover rounded-3xl border border-white shadow-[0_0_35px_rgba(108,71,255,0.25)] hover:scale-105 transition-all duration-500"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;