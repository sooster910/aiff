import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface MePageProps {}

const MePage: React.FunctionComponent<MePageProps> = (props) => {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // 요소가 화면에 보일 때만 opacity를 1로 변경
      if (scrollY >= windowHeight * 0.5 && scrollY <= windowHeight * 1.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 스크롤 이벤트 감지
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // isVisible 값이 변경되면 opacity 효과를 적용
    controls.start({ opacity: isVisible ? 1 : 0 });
  }, [isVisible, controls]);
  return (
    <AnimatePresence>
      <motion.div
        key={"me"}
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "lightblue",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
        }}
      >
        Scroll down to see opacity effect
      </motion.div>
      <h1>scroll event</h1>
    </AnimatePresence>
  );
};

export default MePage;
