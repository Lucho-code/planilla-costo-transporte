import React, { useEffect, useRef, useState } from 'react';
import { animate, motion } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  duration = 0.45,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(value);
  const prevValueRef = useRef<number>(value);

  useEffect(() => {
    const controls = animate(prevValueRef.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo curve
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
      onComplete: () => {
        prevValueRef.current = value;
      },
    });

    return () => controls.stop();
  }, [value, duration]);

  const formatted = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(displayValue);

  return (
    <motion.span
      key={decimals}
      className={`inline-block tabular-nums font-mono ${className}`}
      initial={{ opacity: 0.9, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {prefix}{formatted}{suffix}
    </motion.span>
  );
};
