"use client";

import React from "react";
import { Button } from "../ui/button";
import { UserPlus2 } from "lucide-react";
import { addFriend } from "@/app/actions/addfriend";
interface AddFriendProps {
  id: string;
}

const AddFriend = (props: AddFriendProps) => {
  const handleAddFriend = () => {
    addFriend(props.id).then((res) => {
      console.log(res);
    });
  };

  return (
    <Button
      className="bg-white hover:bg-blue-100 border-2 h-10 border-blue-700 text-blue-700 font-medium text-lg"
      onClick={handleAddFriend}
    >
      <UserPlus2 strokeWidth={3} />
      Add Friend
    </Button>
  );
};

export default AddFriend;
