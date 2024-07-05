import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import NavbarLanding from "./NavbarLanding";
import { ToastContainer } from "react-toastify";

const Landingpage = () => {
  return (
    <>
      <Header />
      <NavbarLanding />
      <ToastContainer />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 text-gray-800">
        <h2 className="text-4xl font-bold mb-4">
          Welcome to Our Hospital Management System
        </h2>
        <div className="flex space-x-4 mb-8"></div>
        <p className="text-lg mb-8">
          Manage your hospital efficiently with our comprehensive system.
        </p>
        <div className="flex space-x-4">
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Learn More
          </button>
          <button
            onClick={() => {
              document
                .getElementById("about-us")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Contact Us
          </button>
        </div>
      </div>
      <div id="about-us" className="bg-slate-800 py-12">
        <div className="max-w-4xl  mx-auto px-36">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-stone-300  sm:text-4xl">
              About Us :
            </h2>
            <p className="mt-4 text-lg leading-6 text-stone-300 ">
              We are dedicated to providing high-quality healthcare services to
              our patients.
            </p>
          </div>
          <div className="mt-12">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-lg leading-6 font-semibold text-stone-300 ">
                  Contact Information:-
                </dt>
                <dd className="mt-2 text-base text-stone-300 ">
                  <p>Email: devenbariya@gmail.com</p>
                  <p>Phone: +91 7575012574</p>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-lg leading-6 font-semibold text-stone-300 ">
                  Links:-
                </dt>
                <dd className="mt-2 text-base text-stone-300 ">
                  <p>
                    LinkedIn:{" "}
                    <a
                      href="https://www.linkedin.com/in/deven-bariya/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Deven Bariya
                    </a>
                  </p>
                </dd>
                <dd className="mt-2 text-base text-stone-300 ">
                  <p>
                    GitHub:{"     "}
                    <a
                      href="https://github.com/ItsMeDeVeN"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Deven Bariya
                    </a>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landingpage;
