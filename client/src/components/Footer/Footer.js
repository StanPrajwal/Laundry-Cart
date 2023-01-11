import React from "react";
import CopyRight from "./CopyRight/CopyRight";
import Referels from "./Referels/Referels";
import SocialLinks from "./SocialLinks/SocialLinks";
import "./Footer.css";

export default function Footer(props) {
  return (
    <div className="footer">
      {props.isLogin ? (
        <></>
      ) : (
        <>
          <Referels />
          <SocialLinks />
        </>
      )}
      <CopyRight />
    </div>
  );
}
