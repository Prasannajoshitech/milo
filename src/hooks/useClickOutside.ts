import { useEffect } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  handler: Handler,
  ignoreRef?: React.RefObject<HTMLElement | null>[] | null
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Check if click is outside the ref element
      if (
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        (ignoreRef &&
          ignoreRef.some((ignore) =>
            ignore.current?.contains(event.target as Node)
          ))
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener); // For mobile devices

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, ignoreRef]);
};

export default useClickOutside;
