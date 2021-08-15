import Image from "next/image";
import { useState, useEffect } from "react";

import FAQ from "../public/FAQ.svg";

const faq = () => {
  const [question, setquestion] = useState(0);

  useEffect(() => {
    setquestion(null);
  }, []);
  return (
    <div className="pt-16">
      <div className="container mx-auto pt-16 bg-gray-200 pb-5`">
        <div className="text-center pb-3 md:pb-10 xl:pb-20">
          <h1 className="px-2 xl:px-0 xl:text-5xl md:text-3xl text-2xl ">
            <Image src={FAQ} />
          </h1>
        </div>
        <div className="w-10/12 mx-auto">
          <ul>
            <li className="py-6 border-gray-200 border-solid border-b">
              <div className="flex justify-between items-center">
                <h3
                  className="text-gray-800 text-base  md:text-xl  xl:text-2xl w-10/12 cursor-pointer "
                  onClick={() =>
                    question === 0 ? setquestion(null) : setquestion(0)
                  }
                >
                  What does lorem ipsum actually mean?
                </h3>
              </div>
              {question === 0 && (
                <p className="pt-2 md:pt-3  lg:pt-5 text-gray-800 bg-gray-200 text-sm md:text-base  xl:text-lg rounded-b-lg">
                  Find the latest events updates or create events, concerts,
                  conferences, workshops, exhibitions, and cultural events in
                  all cities of the US. The aim of Eventistan is to promote
                  healthy and entertaining event. Greatest appreciation to you
                  and your team for the outstanding job you did for us. The
                  website is just what we wanted, and we were thrilled with the
                  speed your team exercised.{" "}
                </p>
              )}
            </li>
            <li className="py-6 border-gray-200 border-solid border-b">
              <div className="flex justify-between items-center">
                <h3
                  className="text-gray-800 text-base  md:text-xl  xl:text-2xl w-10/12 cursor-pointe "
                  onClick={() =>
                    question === 1 ? setquestion(null) : setquestion(1)
                  }
                >
                  How do we know what kind of sounds dinosaurs made?
                </h3>
              </div>
              {question === 1 && (
                <p className="pt-2 md:pt-3  lg:pt-5 text-gray-800 bg-gray-200 text-sm md:text-base  xl:text-lg rounded-b-lg">
                  Find the latest events updates or create events, concerts,
                  conferences, workshops, exhibitions, and cultural events in
                  all cities of the US. The aim of Eventistan is to promote
                  healthy and entertaining event. Greatest appreciation to you
                  and your team for the outstanding job you did for us. The
                  website is just what we wanted, and we were thrilled with the
                  speed your team exercised.{" "}
                </p>
              )}
            </li>
            <li className="py-6 border-gray-200 border-solid border-b">
              <div className="flex justify-between items-center">
                <h3
                  className="text-gray-800 text-base  md:text-xl  xl:text-2xl w-10/12 cursor-pointer "
                  onClick={() =>
                    question === 2 ? setquestion(null) : setquestion(2)
                  }
                >
                  Why work from home is not as fun as we thought it would be?
                </h3>
              </div>
              {question === 2 && (
                <p className="pt-2 md:pt-3  lg:pt-5 text-gray-800 bg-gray-200 text-sm md:text-base  xl:text-lg rounded-b-lg">
                  Find the latest events updates or create events, concerts,
                  conferences, workshops, exhibitions, and cultural events in
                  all cities of the US. The aim of Eventistan is to promote
                  healthy and entertaining event. Greatest appreciation to you
                  and your team for the outstanding job you did for us. The
                  website is just what we wanted, and we were thrilled with the
                  speed your team exercised.{" "}
                </p>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default faq;
