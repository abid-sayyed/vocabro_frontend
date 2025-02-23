/** @format */

"use client";
import { Grid } from "@mantine/core";
import { Container } from "@mantine/core";
import { Stack } from "@mantine/core";
import ReaderPad from "@/components/RWS/Read/ReaderPad";
import HintPad from "@/components/RWS/Read/HintPad";
import HelperPad from "@/components/RWS/Read/HelperPad";
import { Space } from "@mantine/core";
import ModeLayout from "@/components/RWS/ModeLayout";
import ImprovePad from "@/components/RWS/Improve/ImprovePad";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import AuthenticationContextValue from "@/context/AuthenticationContext";


function ReadMode() {
  const { loginState } = useContext(AuthenticationContextValue);

  const router = useRouter();

  // redirect for non-authenticated users

  // useEffect(() => {

  //   if (!loginState) {
  //     // Redirect to login page if not authenticated
  //     router.push('/authentication');
  //   }
  // }, [router]); // Run on mount

  return (
    <ModeLayout MainComponent={ImprovePad} />
  );
}

export default ReadMode;
