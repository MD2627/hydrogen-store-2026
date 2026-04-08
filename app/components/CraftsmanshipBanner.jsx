import { RichText } from './RichText';

export function CraftsmanshipBanner({
  heading = "Crafted with care, worn with love, cherished for life.",
  description = "Cullen sets the standard in fine jewelery with a commitment to thoughtful, enduring craftsmanship. At every stage, our jewelers blend tradition and innovation to create pieces made to last – and made responsibly."
}) {
  return (
    <div className="craftsmanship-banner">
      <h3>{heading}</h3>
      <RichText tag="p" html={description} />
    </div>
  );
}
