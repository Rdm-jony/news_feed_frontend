/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { revalidateTag } from "next/cache";

export async function revalidatePosts() {
    revalidateTag("posts", { expire: 0 });
}






