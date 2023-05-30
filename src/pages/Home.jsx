import { useEffect } from "react";
import { Layout } from "../components/navbar/layout";
import { Section1, Section2,Section3 } from "../components/home/";

export const Home = () => {
  // useEffect(() => {
  //   function customScrollTo(to, duration, easingFunction) {
  //     let start = window.scrollY || window.pageYOffset;

  //     let time = Date.now();
  //     let timeElapsed = 0;

  //     let speed = (to - start) / duration;

  //     (function move() {
  //       if (timeElapsed > duration) {
  //         return;
  //       }

  //       timeElapsed = Date.now() - time;

  //       // Get the displacement of "y"
  //       let dy = speed * timeElapsed;
  //       let y = start + dy;

  //       // Map "y" into a range from 0 to 1
  //       let _y = (y - start) / (to - start);
  //       // Fit "_y" into a curve given by "easingFunction"
  //       _y = easingFunction(_y);
  //       // Expand "_y" into the original range
  //       y = start + (to - start) * _y;

  //       window.scrollTo(0, y);
  //       window.requestAnimationFrame(move);
  //     })();
  //   }

  //   let easeInOutQuint = (t) =>
  //     t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t; // Easing function found at https://gist.github.com/gre/1650294

  //   // With this attempt I tried to make the scroll by mouse wheel look smooth
  //   let delay = (ms) => new Promise((res) => setTimeout(res, ms));
  //   let dy = 0;
  //   window.addEventListener(
  //     "wheel",
  //     async (e) => {
  //       // Prevent the default way to scroll the page
  //       e.preventDefault();

  //       dy += e.deltaY;
  //       let _dy = dy; // Store the value of "dy"
  //       await delay(150); // Wait for .15s

  //       // If the value hasn't changed during the delay, then scroll to "start + dy"
  //       if (_dy === dy) {
  //         let start = window.scrollY || window.pageYOffset;
  //         customScrollTo(start + dy, 600, easeInOutQuint);
  //         dy = 0;
  //       }
  //     },
  //     { passive: false }
  //   );
  // }, []);

  // useEffect(() => {
  //   const handleScroll = (e) => {
  //     e.preventDefault();

  //     const delta = Math.sign(e.deltaY);
  //     const scrollDistance =250 //1050; // Distancia de desplazamiento suave
  //     const duration = 2000; // Duración total de la animación en milisegundos

  //     const start = window.pageYOffset || document.documentElement.scrollTop;
  //     const target = start + delta * scrollDistance;
  //     const startTime = performance.now();

  //     const animateScroll = (currentTime) => {
  //       const elapsed = currentTime - startTime;
  //       const progress = Math.min(elapsed / duration, 1);
  //       const easedProgress = easeOutQuart(progress);
  //       const scrollTo = start + (target - start) * easedProgress;

  //       if (progress >= 1) {
  //         // Asegura un último desplazamiento suave al llegar al final
  //         // window.scrollTo(0, target);

  //       } else {
  //         // window.scrollTo(0, target);
  //         window.scrollTo({
  //           top: scrollTo,
  //           behavior: 'smooth'
  //         });
  //         requestAnimationFrame(animateScroll);
  //       }
  //     };

  //     requestAnimationFrame(animateScroll);
  //   };

  //   document.addEventListener('wheel', handleScroll, { passive: false });

  //   return () => {
  //     document.removeEventListener('wheel', handleScroll);
  //   };
  // }, []);

  // useEffect(() => {
  //   const handleScroll = (e) => {
  //     e.preventDefault();

  //     const delta = Math.sign(e.deltaY);
  //     const scrollDistance = 400; // Distancia de desplazamiento suave
  //     window.scrollTo({
  //       top: window.pageYOffset + delta * scrollDistance,
  //       behavior: 'smooth'
  //     });

  //   };

  //   document.addEventListener('wheel', handleScroll, { passive: false });
  //   return () => {
  //     document.removeEventListener('wheel', handleScroll);
  //   };
  // }, []);


  // useEffect(() => {
  //   const handleScroll = (e) => {
  //     e.preventDefault();

  //     const delta = Math.sign(e.deltaY);
  //     const scrollDistance =250 //1050; // Distancia de desplazamiento suave
  //     const duration = 2000; // Duración total de la animación en milisegundos

  //     const start = window.pageYOffset || document.documentElement.scrollTop;
  //     const target = start + delta * scrollDistance;
  //     const startTime = performance.now();

  //     const animateScroll = (currentTime) => {
  //       const elapsed = currentTime - startTime;
  //       const progress = Math.min(elapsed / duration, 1);
  //       const easedProgress = easeOutQuart(progress);
  //       const scrollTo = start + (target - start) * easedProgress;

  //       if (progress >= 1) {
  //         // Asegura un último desplazamiento suave al llegar al final
  //         // window.scrollTo(0, target);

  //       } else {
  //         // window.scrollTo(0, target);
  //         window.scrollTo({
  //           top: scrollTo,
  //           behavior: 'smooth'
  //         });
  //         requestAnimationFrame(animateScroll);
  //       }
  //     };

  //     requestAnimationFrame(animateScroll);
  //   };

  //   document.addEventListener('wheel', handleScroll, { passive: false });

  //   return () => {
  //     document.removeEventListener('wheel', handleScroll);
  //   };
  // }, []);

  // const easeOutQuart = (t) => {
  //   return 1 - Math.pow(1 - t, 4);
  // };


  return (
    <div className="prueba">
      <Layout>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section1 />
        {/* <Section1 />
        <Section1 /> */}
      </Layout>
    </div>
  );
};
