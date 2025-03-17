"use client";
import { userData } from "@/lib/redux/auth/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const UserFetcher = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await axios
          .get("http://localhost:8000/api/dashboard", { withCredentials: true })
          .then((response) => {
            dispatch(userData(response.data.user));
          })
          .catch((error) => {
            router.push("/login");
            toast.error(error.response?.data?.error || "somthing went wrong");
          });
      } catch (error) {
        console.log("error", error);
      }
    }

    fetchUsers();
  }, [dispatch]);

  return null;
};

export default UserFetcher;
