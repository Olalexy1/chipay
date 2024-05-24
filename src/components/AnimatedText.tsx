"use client"

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useAnimation, useInView } from "framer-motion";

const defaultAnimations = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};

// const defaultAnimations = {
//     hidden: {
//         opacity: 0,
//         y: 20,
//     },
//     visible: {
//         opacity: 1,
//         y: 0,
//         transition: {
//             duration: 0.1,
//         },
//     },
// };

const AnimatedText = ({
    text,
    element: Wrapper = "p",
    className,
    once,
    repeatDelay,
    animation = defaultAnimations,
}: AnimatedTextProps) => {
    const controls = useAnimation();
    const textArray = Array.isArray(text) ? text : [text];
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once });

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const show = () => {
            controls.start("visible");
            if (repeatDelay) {
                timeout = setTimeout(async () => {
                    await controls.start("hidden");
                    controls.start("visible");
                }, repeatDelay);
            }
        };

        if (isInView) {
            show();
        } else {
            controls.start("hidden");
        }

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView]);

    return (
        <Wrapper className={className}>
            <span className="sr-only">{text}</span>
            <motion.span
                ref={ref}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                    hidden: {}
                }}
                initial="hidden"
                animate={controls}
                aria-hidden>
                {textArray.map((line, lineIndex) => (
                    <span className="block" key={`${line}-${lineIndex}`}>
                        {line.split(" ").map((word, wordIndex) => (
                            <span className="inline-block" key={`${word}-${wordIndex}`}>
                                {word.split("").map((char, charIndex) => (
                                    <motion.span
                                        key={`${char}-${charIndex}`}
                                        className="inline-block"
                                        variants={animation}
                                    >
                                        {char}
                                    </motion.span>
                                ))
                                }
                                < span className="inline-block" >& nbsp;</span>
                            </span>
                        ))}
                    </span>
                ))}
            </motion.span>
        </Wrapper >
    );
};

export default AnimatedText;
