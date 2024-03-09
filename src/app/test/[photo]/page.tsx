export default function Page({ params }: { params: { photo: string } }) {
  return <div className="text-white">normal route: {params.photo}</div>;
}
