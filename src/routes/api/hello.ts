import { json } from "solid-start"
import { setTimeout } from "timers/promises"

export async function GET() {
  return json({ message: "hello world!" })
}
