import React from "react";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function SocialLinks() {
  return (
    <div className="links">
      <div className="about-us">
        <p className="heading">About Us</p>
        <p className="text">Doorstep Wash & Dryclean Service</p>
      </div>
      <div className="siteLinks">
        <div className="home">
          <p className="heading">Home</p>
          <p className="text">Sign In</p>
          <p className="text">Register</p>
        </div>
        <div className="pricing">
          <p className="heading">pricing</p>
        </div>
        <div className="career">
          <p className="heading">Career</p>
          <p className="text">Blogs</p>
          <p className="text">Create</p>
        </div>
        <div className="contact">
          <p className="heading">Contact</p>
        </div>
      </div>
      <div className="socialLinks">
        <p className="heading">Social Media</p>
        <div className="linksImage">
          <FaFacebookSquare className="facebook"></FaFacebookSquare>
          <RiInstagramFill className="instagram"></RiInstagramFill>
          <FaLinkedin className="linkedin"></FaLinkedin>
        </div>
      </div>
    </div>
  );
}
