"use client";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { user } = useUser()
  console.log(user);
  return (
    <div className={"flex flex-col gap-2"}>
      <h1 className={"font-black text-5xl"}>my-incredible-app</h1>
      <div>
        <div className={"font-mono text-sm mt-3"}>Application ID: 99432113432</div>
        <div className={"font-mono text-sm"}>Created at: 2023-10-01</div>
      </div>

      <div className={"w-full border-b "}></div>

      <div className={"text-lg font-semibold"}>Your Naro URI</div>
      <Input className={"w-full max-w-[550px]"} value="narodb://user_2wv5d07JPRUflViF2uKBhjgzSYf:naroapi.com:4010/99432113432" readOnly/>

      <div className={"text-lg font-semibold mt-5"}>Example</div>

      <div>Create a .env file in the root of your project</div>
      <div className={"bg-gray-100 p-4 rounded text-sm"}>
        <pre>
    <code>{`NARODB_URI=narodb://user_2wv5d07JPRUflViF2uKBhjgzSYf:naroapi.com:4010/99432113432`}</code>
  </pre>
      </div>

      <div>Then in your code</div>
      <div className={"bg-gray-100 p-4 rounded text-sm"}>
          <pre>
      <code>{`import { Naro } from "@narodb/naro";
const URI = process.env.NARODB_URI;
const db = new Naro("connect", { URI });`}</code>
    </pre>
      </div>
      <div>Now you can use the db object to interact with your NaroDB instance</div>
      <div className={"bg-gray-100 p-4 rounded text-sm"}>
        <pre>
    <code>{`const users = db.add("users", {
  name: "John Doe",
});`}</code>
  </pre>
      </div>

    </div>
  );
}
