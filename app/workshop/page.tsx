import { redirect } from "next/navigation";

export default function WorkshopRedirect() {
  redirect("/workshop/day-one");
  return null;
} 