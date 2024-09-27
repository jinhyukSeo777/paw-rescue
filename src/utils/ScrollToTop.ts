import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 스크롤을 상단으로 이동
  }, [pathname]); // pathname이 변경될 때마다 스크롤을 위로 이동

  return null;
}

export default ScrollToTop;
