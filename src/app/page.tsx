import { collection, getDocs } from "firebase/firestore";
import { ImageCard } from "./ui/imageCard/ImageCard";
import { firestore } from "@/firebase/firebase";

type PhotographyType = {
  collectionName: string;
  name: string;
  thumbnailId: string;
};

const getData = async () => {
  const res = await getDocs(collection(firestore, "homePage"));
  console.log("res", res);
  const result: PhotographyType[] = [];

  res.forEach((data) => {
    result.push(data.data() as PhotographyType);
  });

  return result;
};

export default async function asyncHome() {
  const homePageCards = await getData();

  return (
    <main className="flex-[2] py-6">
      <div className="flex items-center gap-12 justify-center flex-wrap h-full">
        {homePageCards.map((card) => (
          <ImageCard
            key={card.collectionName}
            src={`https://res.cloudinary.com/dn8n473ye/image/upload/c_scale,h_500/${card.thumbnailId}.webp`}
            alt={`${card.name} Thumbnail`}
            title={card.name}
          />
        ))}
      </div>
    </main>
  );
}
