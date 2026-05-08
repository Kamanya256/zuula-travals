interface Props {
  videoId: string;
  title?: string;
}

export default function YouTubeEmbed({ videoId, title = "Video" }: Props) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-card border border-border">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        loading="lazy"
      />
    </div>
  );
}
