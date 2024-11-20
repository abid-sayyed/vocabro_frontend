/** @format */

import { Button, Text, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState, useContext } from "react";
import AuthenticationContextValue from "@/context/AuthenticationContext";
import { HttpHookService } from "@/services/HttpHookService";

// Create a new LogoutModal component

export function LogoutModal() {
  const { authPost } = HttpHookService();
  const { setLoginState } = useContext(AuthenticationContextValue);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {

    try {
      setLoading(true); // Set loading to true when logout starts
      const response = await authPost("/logout");

      if (response.status === 200) {
        if (typeof window !== "undefined") {
          localStorage.setItem("isLoggedIn", JSON.stringify(false));
        }
        setLoginState(false);
        console.log("Logout successful");
      } else {
        console.log("Logout failed: ", response);
      }
    } catch (error) {
      console.error("Logout error: ", error);
    } finally {
      setLoading(false); // Set loading to false once the request completes
    }
  };

   const openLogoutModal = () =>

    modals.openConfirmModal({
      title: "Logout Confirmation",
      centered: true,
      children: (
        <>
          <Text size="sm">Are you sure you want to logout?</Text>
          {loading && <Loader size="sm" />}
        </>
      ),
      labels: { confirm: "Yes, Logout", cancel: "No" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Logout canceled"),
      onConfirm: onConfirm,
    });








    
}

