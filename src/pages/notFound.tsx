import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <section className="page_404 py-10 bg-white font-serif">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="text-center w-full max-w-4xl">
            <div
              className="four_zero_four_bg bg-center bg-cover h-[250px] sm:h-[400px] md:h-[650px]"
              style={{
                backgroundImage:
                  'url(https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif)',
              }}
            />
            <div className="contant_box_404 mt-[-30px] sm:mt-[-50px]">
              <h3 className="h2 text-3xl sm:text-4xl md:text-5xl">Look like you're lost</h3>
              <p className="text-sm sm:text-base md:text-lg">
                The page you are looking for is not available!
              </p>
              <Link to={'/'}
                className="link_404  text-white py-2 px-5 bg-[#39ac31] inline-block mt-5 rounded-md transition-colors hover:bg-[#319a2b]"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
