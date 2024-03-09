import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex flex-col gap-3 text-white">
      <Link href="/test/link1">Link 1</Link>
      <Link href="/test/link2">Link 2</Link>
      <Link href="/test/link3">Link 3</Link>
      <Link href="/test/link4">Link 4</Link>
    </div>
  );
}
