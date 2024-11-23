/** @format */

import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useEffect } from "react";
import AuthenticationContextValue from "@/context/AuthenticationContext";

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
} from "@mantine/core";
import { GoogleButton } from "./GoogleButton";
import { TwitterButton } from "./TwitterButton";

export default function AuthenticationForm(props: PaperProps) {

  const [type, toggle] = useToggle(["login", "register"]);
  const router = useRouter();
  const { loginState, setLoginState } = useContext(AuthenticationContextValue);


  useEffect(() => {

    if (loginState) {
      // Redirect to login page if not authenticated
      router.push('/');
    }
  }, [router]); // Run on mount


  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      terms: (val) => (val ? false : "You should accept terms and conditions"),
    },
  });

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginState) {
      alert("You are already logged in");
      router.push("/");
    }

    if (!form.values.terms) {
      alert("Please accept terms and conditions");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${type}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Ensure cookies are included with the request
        body: JSON.stringify(form.values),
      }
    );

    const handleLoginState = (isLoggedIn: boolean, errorMessage?: string) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
      }
      setLoginState(isLoggedIn);
      if (errorMessage) {
        alert(errorMessage);
      }
    };

    if (response.status === 200) {
      handleLoginState(true);
      form.reset();
      router.push("/");
    } else if (response.status === 404) {
      handleLoginState(false, "Invalid username or email");
    } else if (response.status === 401) {
      handleLoginState(false, "Invalid password");
    } else {
      handleLoginState(false, "An error occurred. Please try again later");
    }
  };

  return (
    <Container size={550} my={40}>
      <Paper radius="md" p="xl" withBorder {...props}>
        {/* <Text size="lg" fw={500}>
          Welcome to Vocabro, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}

        <form
          onSubmit={
            (event) => formSubmit(event) // Pass required parameters
          }
        >
          <Stack>
            {type === "register" && (
              <TextInput
                label="Username"
                placeholder="Your Username"
                value={form.values.username}
                onChange={(event) =>
                  form.setFieldValue("username", event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
