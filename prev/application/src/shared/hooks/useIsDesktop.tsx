import { useEffect, useState } from "react";

function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(()=>{
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    const handleResize = () => {
        if (window.innerWidth > 1200) {
            setIsDesktop(true)
        } else {
            setIsDesktop(false)
        }
    }

    return isDesktop;
}

export default useIsDesktop;
