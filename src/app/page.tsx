import Image from "@/components/Image";
import Input from "@/components/Input";
import Response from "@/components/Response";
import Select from "@/components/Select";

export default function Home() {
  return (
    <main className="flex min-h-screen max-h-screen overflow-hidden flex-col items-center p-5 md:p-24 gap-3">
      <p className="absolute top-2">
        Dados obtidos pelo{" "}
        <a
          href="https://gamepress.gg/pokemongo/"
          className="text-blue-400 underline"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          GamePress
        </a>
      </p>
      <Image alt="pokemon" />
      <Select />
      <Input className="mt-10 w-full md:w-96" />
      <Response />
    </main>
  );
}
