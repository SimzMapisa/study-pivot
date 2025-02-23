"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export type userType = {
  friendshipStatus: string;
  _id: string;
  avatar: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  userType: string;
  dob: string;
  phone: string;
  gender: string;
  country: string;
  state: string;
  school: string;
  languages: string;
  profilecompleted: boolean;
};

export async function getUsers(): Promise<userType[]> {
  const { getToken } = await auth();

  const token = await getToken();
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/api/v1/users",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
