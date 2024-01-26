import {prisma} from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButton

from "@/components/FormSubmitButton";
export const metadata = {
    title: "Add Product - Flowmazon"
}

async function addProduct( formData:FormData){
"use server";
 const name= formData.get("name")?.toString();
 const description= formData.get("description")?.toString();
 const image= formData.get("image")?.toString();
 const price= Number(formData.get("price")|| 0);

if(!name||!description||!image||!price){
    throw Error ("missing required fields");
}
await prisma.product.create({
    data:{ name,description,image,price},
});
redirect("/")
}
export default function AddProdectPage() {
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          type="text"
          placeholder="name"
          className="input w-full"
        />
        <textarea
          className="textarea w-full mt-3"
          placeholder="description"
          name="description"
          required
        />
        <input
          required
          name="image"
          type="url"
          placeholder="image"
          className="input w-full mt-3"
        />
        <input
          required
          name="price"
          type="number"
          placeholder="price"
          className="input w-full mt-3"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
