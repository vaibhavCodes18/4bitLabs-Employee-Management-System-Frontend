import React from "react";

const About = () => {
  return (
    <section id="about" className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            About 4bitLabs
          </h2>
          <p className="text-indigo-600 font-medium mt-2">
            Empowering Future Tech Leaders
          </p>
          <p className="text-gray-600 mt-4 text-lg">
            Founded in 2020, 4bitLabs is a premier software training institute
            dedicated to bridging the gap between academia and industry. Our
            Employee Management System (EMS) streamlines internal operations,
            ensuring that every role—from admin to counsellor—works in harmony
            to deliver exceptional learning experiences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-blue-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800">500+</h3>
              <p className="text-gray-600">Students Trained</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800">20+</h3>
              <p className="text-gray-600">Expert Trainers</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800">10+</h3>
              <p className="text-gray-600">Courses Offered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
