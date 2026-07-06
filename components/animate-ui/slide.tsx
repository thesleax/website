"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Variant } from "motion/react";
import { useIsInView, type UseIsInViewOptions } from "@/hooks/use-is-in-view";

export type SlideDirection = "up" | "down" | "left" | "right";

export type SlideProps = {
  children?: React.ReactNode;
  delay?: number;
  direction?: SlideDirection;
  offset?: number;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
} & UseIsInViewOptions &
  HTMLMotionProps<"div">;

export function Slide({
  ref,
  transition = { type: "spring", stiffness: 200, damping: 22 },
  delay = 0,
  inView = false,
  inViewMargin = "-60px",
  inViewOnce = true,
  direction = "up",
  offset = 40,
  children,
  className,
  ...rest
}: SlideProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const { ref: localRef, isInView } = useIsInView(ref as React.Ref<HTMLDivElement>, {
    inView,
    inViewOnce,
    inViewMargin,
  });

  const axis = direction === "up" || direction === "down" ? "y" : "x";
  const hidden: Variant = {
    [axis]: direction === "right" || direction === "down" ? -offset : offset,
    opacity: 0,
  };
  const visible: Variant = { [axis]: 0, opacity: 1 };

  // Show when: inView animation is disabled, not yet mounted, or element is in viewport.
  // Use instant transition when hiding (duration:0) to prevent reverse animation.
  const show = !inView || !mounted || isInView;

  return (
    <motion.div
      ref={localRef}
      initial={false}
      animate={show ? "visible" : "hidden"}
      variants={{ hidden, visible }}
      transition={
        show
          ? { ...transition, delay: (transition?.delay ?? 0) + delay / 1000 }
          : { duration: 0 }
      }
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export type SlidesProps = Omit<SlideProps, "children" | "className"> & {
  children: React.ReactElement | React.ReactElement[];
  holdDelay?: number;
  className?: string;
};

export function Slides({ children, delay = 0, holdDelay = 80, className, ...props }: SlidesProps) {
  const array = React.Children.toArray(children) as React.ReactElement[];
  return (
    <div className={className}>
      {array.map((child, index) => (
        <Slide key={child.key ?? index} delay={delay + index * holdDelay} {...props}>
          {child}
        </Slide>
      ))}
    </div>
  );
}
