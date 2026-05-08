interface Props {
  query: string;
  height?: string;
}

export default function GoogleMapEmbed({ query, height = "300px" }: Props) {
  const encoded = encodeURIComponent(query);
  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-card" style={{ height }}>
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encoded}`}
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map: ${query}`}
      />
    </div>
  );
}
