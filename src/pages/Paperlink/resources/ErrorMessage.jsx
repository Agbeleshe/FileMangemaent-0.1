import React from "react";
import Lottie from "lottie-react";
import error from '../../../assests/error (1).json'

//an array of funny reasons
const funnyReasons = [
  "a unicorn broke the internet cable",
  "a cat walked on the server keyboard",
  "the web developer spilled coffee on the server",
  "a UFO abducted our website",
  "a penguin tried to surf the web but wiped out",
  "the website fell asleep counting sheep",
  "a squirrel used the server as a nut storage",
  "the server mistook your request for a love letter",
  "the server caught a computer virus",
  "the website is taking a digital vacation",
  "the server is in a virtual traffic jam",
  "the website is hosting a virtual tea party",
  "the server is busy doing the robot dance",
  "a glitch in the matrix disrupted the website",
  "the server is practicing mindfulness meditation",
  "the website is stuck in a virtual escape room",
  "the server is on strike demanding more bandwidth",
  "a cookie monster devoured all the website cookies",
  "a virtual black hole swallowed the website",
  "a pixel rebellion is causing chaos on the server",
];

const getRandomFunnyReason = () => {
  // i generated a random index within the range of the funnyReasons array length
  const randomIndex = Math.floor(Math.random() * funnyReasons.length);
  // and also i even return the randomly selected funny reason
  return funnyReasons[randomIndex];
};

const ErrorMessage = ({ message }) => {
  // then i now called the getRandomFunnyReason function to get a random reason lol...
  const funnyReason = getRandomFunnyReason();

  return (
    <div className="text-yellow-700 font-bold bg-yellow-100 flex justify-center text-center gap-5 py-4 px-2 items-center">
      Sorry! {funnyReason}. Just kidding, {message}. <div><Lottie animationData={error} /></div>
    </div>
  );
};

export default ErrorMessage;
