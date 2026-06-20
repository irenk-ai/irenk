import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const BlurText = ({ text, delay = 200, className = '' }) => {
  const words = text.split(' ');
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <p ref={ref} className={`inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
          animate={inView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.3,
            delay: (index * delay) / 1000,
            ease: 'easeOut',
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};
