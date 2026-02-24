import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { ReactNode, useEffect } from "react";

interface SmoothScrollProps {
    children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
    }, [lenis]);

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.2,
                wheelMultiplier: 1,
                smoothWheel: true,
                syncTouch: false,
            }}
        >
            {children}
        </ReactLenis>
    );
};

export default SmoothScroll;