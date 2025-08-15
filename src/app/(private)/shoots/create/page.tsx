import { Input } from "@/components/ui/input"
import Form from "next/form"
import { FormButton } from "@/components/form-button"
import { Label } from "@/components/ui/label"
import { db } from "@/lib/db"
import { shootsTable } from "@/lib/db/schema"
import { nanoid } from "nanoid"
import { routes } from "@/lib/routes"
import { redirect } from "next/navigation"

export default function Page() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const nameInput = formData.get("name")
    if (!nameInput) {
      alert("Please enter a name")
      return
    }
    const name = nameInput.toString()
    const id = "shoot_" + nanoid()
    try {
      await db.insert(shootsTable).values({
        id,
        name,
        categoryId: undefined,
      })
    } catch (e) {
      console.error(e)
      return
    }
    redirect(`${routes.shoots}/${id}`)
  }
  return (
    <Form className="flex flex-col gap-4 max-w-md" action={handleSubmit}>
      <Label>Name</Label>
      <Input name="name" required />
      {/*
      TODO: Add category select
      */}
      <FormButton text="Create Shoot" />
    </Form>
  )
}
