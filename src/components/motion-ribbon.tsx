type MotionRibbonProps = {
  label?: string;
  items: string[];
};

export default function MotionRibbon({ label, items }: MotionRibbonProps) {
  const doubled = [...items, ...items];
  const trimmedLabel = label?.trim();

  return (
    <section className="motion-ribbon" aria-label={trimmedLabel || "Bandeau déroulant"}>
      {trimmedLabel ? <p className="motion-ribbon-label">{trimmedLabel}</p> : null}
      <div className="motion-ribbon-viewport">
        <div className="motion-ribbon-track">
          {doubled.map((item, index) => (
            <span key={`${item}-${index}`} className="motion-pill">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
