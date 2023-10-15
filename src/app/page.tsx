import { ImageCard } from "./ui/imageCard/ImageCard";
import CarsThumbnail from "../../public/carsThumbnail.webp";
import LandscapeThumbnail from "../../public/landscapeThumbnail.webp";
import StreetPhotographyThumbnail from "../../public/streetPhotographyThumbnail.webp";

export default function Home() {
  return (
    <main className="flex-[2] py-6">
      <div className="flex items-center gap-12 justify-center flex-wrap h-full">
        <ImageCard
          src={LandscapeThumbnail}
          alt="Landscape Thumbnail"
          title="Landscape"
        />
        <ImageCard src={CarsThumbnail} alt="Cars Thumbnail" title="Cars" />
        <ImageCard
          src={StreetPhotographyThumbnail}
          alt="Street Photography Thumbnail"
          title="Street Photography & Others"
        />
      </div>
    </main>
  );
}
