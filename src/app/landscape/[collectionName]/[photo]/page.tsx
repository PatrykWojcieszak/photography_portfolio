import Link from "next/link";

export default async function Page() {
  return (
    <section className="py-24">
      <div className="container">
        <div>
          <Link
            href="/photos"
            className="font-semibold italic text-sky-600 underline">
            Back to photos
          </Link>
        </div>
      </div>
    </section>
  );
}
