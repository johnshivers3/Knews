import { useState, useEffect } from "react";
import "./ScrollToTop.css";

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const showScrollButton = () => {
      window.scrollY > 500 ? setVisible(true) : setVisible(false);
    };
    window.addEventListener("scroll", showScrollButton);

    return ()=> window.removeEventListener("scroll", showScrollButton)

  },[]);

  return <>{visible && <button id='scroll-to-top' onClick={scrollToTop}></button>}</>;
};

export default ScrollToTop;
