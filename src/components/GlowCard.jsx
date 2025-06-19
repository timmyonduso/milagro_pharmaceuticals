import { useRef } from "react";
import { star, starDark } from "../assets";

const GlowCard = ({ card, index, children, className = "" }) => {
  // refs for all the cards
  const cardRefs = useRef([]);

  // when mouse moves over a card, rotate the glow effect
  const handleMouseMove = (index) => (e) => {
    // get the current card
    const card = cardRefs.current[index];
    if (!card) return;

    // get the mouse position relative to the card
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // calculate the angle from the center of the card to the mouse
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

    // adjust the angle so that it's between 0 and 360
    angle = (angle + 360) % 360;

    // set the angle as a CSS variable
    card.style.setProperty("--start", angle + 60);
  };

  // return the card component with the mouse move event
  return (
    <div
      ref={(el) => (cardRefs.current[index] = el)}
      onMouseMove={handleMouseMove(index)}
      style={{
        "--gradient": "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)"
      }}
      className={`relative card card-border border-none timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column
                 bg-white text-[#4D5053] dark:bg-zinc-900 dark:text-white shadow-md dark:shadow-lg ${className}`}
    >
      {/* Glow effect div */}
      <div className="glow pointer-events-none absolute inset-0 z-0 rounded-xl"></div>

      <div className="relative z-10 flex items-center gap-1 mb-5">
        {Array.from({ length: 5 }, (_, i) => (
          <img
            key={i}
            src={starDark}
            alt="star"
            className="size-5 block dark:hidden"
          />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <img
            key={i}
            src={star}
            alt="star"
            className="size-5 hidden dark:block"
          />
        ))}
      </div>
      <div className="relative z-10 mb-5">
        <p className="text-lg text-[#4D5053] dark:text-white/80">{card.review}</p>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlowCard;