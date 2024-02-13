import { GalleryContextController } from "@/providers/gallery/galleryContextController/GalleryContextController";

export default function PhotosLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <GalleryContextController>
      {/* {modal} */}
      {children}
    </GalleryContextController>
  );
}
