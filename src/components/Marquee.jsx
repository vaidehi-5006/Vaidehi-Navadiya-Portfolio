export default function Marquee() {
  const marqueeText = 'VAIDEHI NAVADIYA • UI/UX DESIGNER • FRONTEND DEVELOPER • GRAPHIC DESIGNER • '.repeat(3);

  return (
    <div className="marquee-container animate-fade-up stagger-3">
      {[0, 1].map((index) => (
        <div
          key={index}
          className="marquee-content"
          style={{ textTransform: 'uppercase' }}
        >
          {marqueeText}
        </div>
      ))}
    </div>
  );
}
