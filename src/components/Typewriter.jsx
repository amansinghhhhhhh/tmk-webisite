import { useEffect, useRef, useState } from "react";

export default function Typewriter({
  words = [],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1800,
}) {
  const [text, setText] = useState("");

  const wordIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    if (!words.length) return;

    let timeout;

    const type = () => {
      const currentWord = words[wordIndex.current];

      if (!deleting.current) {
        charIndex.current++;
        setText(currentWord.substring(0, charIndex.current));

        if (charIndex.current === currentWord.length) {
          deleting.current = true;
          timeout = setTimeout(type, pauseTime);
          return;
        }

        timeout = setTimeout(type, typingSpeed);
      } else {
        charIndex.current--;
        setText(currentWord.substring(0, charIndex.current));

        if (charIndex.current === 0) {
          deleting.current = false;
          wordIndex.current = (wordIndex.current + 1) % words.length;
          timeout = setTimeout(type, 400);
          return;
        }

        timeout = setTimeout(type, deletingSpeed);
      }
    };

    timeout = setTimeout(type, typingSpeed);

    return () => clearTimeout(timeout);
  }, [words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <div className="hero-animated-line">
      <span className="typewriter-text">{text}</span>
      <span className="cursor"></span>
    </div>
  );
}