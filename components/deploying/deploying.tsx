import Image from "next/image";

export default function Deploying() {
  return (
    <div className="flex justify-center items-center h-96 gap-10">
      <Image src={"/waiting.gif"} alt={""} width={50} height={50} className={"w-20 h-20"}/>
      <div>
        <h1 className="text-2xl font-bold mb-4">Deploying...</h1>
        <p className="text-gray-500">Please wait while we deploy your application.</p>
      </div>
    </div>
  );
}
