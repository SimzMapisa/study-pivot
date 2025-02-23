"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import axios from "axios";

export async function addFriend(friendId: string) {
  const { getToken } = await auth();
  const user = await currentUser();

  const email = user?.emailAddresses[0].emailAddress;

  const token = await getToken();
  try {
    const response = await axios({
      method: "post",
      url: `http://localhost:3000/api/v1/add-friend/${friendId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        email: email,
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
