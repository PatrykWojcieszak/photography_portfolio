import { ImageCard } from "./ui/imageCard/ImageCard";

export default function Home() {
  return (
    <main className="flex-[2] py-6">
      <div className="flex items-center gap-12 justify-center flex-wrap h-full">
        <ImageCard
          src="https://res.cloudinary.com/dn8n473ye/image/upload/c_scale,h_500/mzgshobomvwz7w4cica9.webp"
          alt="Landscape Thumbnail"
          title="Landscape"
        />
        <ImageCard
          src="https://res.cloudinary.com/dn8n473ye/image/upload/c_scale,h_500/zwo00wsjdykjjn4kdoxp.webp"
          alt="Cars Thumbnail"
          title="Cars"
        />
        <ImageCard
          src="https://res.cloudinary.com/dn8n473ye/image/upload/c_scale,h_500/aukvbcvugln8hkjlqtq7.webp"
          alt="Street Photography Thumbnail"
          title="Street Photography & Others"
        />
      </div>
    </main>
  );
}
