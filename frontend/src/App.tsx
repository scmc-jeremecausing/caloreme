import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { fetchHealth } from "./api/graphql";

type HealthState = "loading" | "healthy" | "unavailable";

export default function App() {
  const [healthState, setHealthState] = useState<HealthState>("loading");

  useEffect(() => {
    let isCurrent = true;

    fetchHealth()
      .then(() => {
        if (isCurrent) setHealthState("healthy");
      })
      .catch(() => {
        if (isCurrent) setHealthState("unavailable");
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <Box bg="gray.50" minH="100vh" px="6" py="16">
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
        margin="auto"
        maxW="lg"
        p="8"
      >
        <Heading size="lg">Caloreme</Heading>
        <Text color="gray.600" mt="2">
          Full-stack application health
        </Text>
        <Box aria-live="polite" mt="8">
          {healthState === "loading" && (
            <Box alignItems="center" display="flex" gap="3">
              <Spinner size="sm" />
              <Text>Checking API status…</Text>
            </Box>
          )}
          {healthState === "healthy" && (
            <Text color="green.600" fontWeight="semibold">
              API status: OK
            </Text>
          )}
          {healthState === "unavailable" && (
            <Text color="red.600" role="alert">
              API status: unavailable
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}
