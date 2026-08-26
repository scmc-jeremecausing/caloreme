import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "./App";

function renderApp() {
  return render(
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>,
  );
}

describe("App", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a loading state while checking the API", () => {
    vi.mocked(fetch).mockReturnValue(new Promise(() => {}));

    renderApp();

    expect(screen.getByText("Checking API status…")).toBeInTheDocument();
  });

  it("shows the healthy API status", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ data: { health: "OK" } }), { status: 200 }),
    );

    renderApp();

    expect(await screen.findByText("API status: OK")).toBeInTheDocument();
  });

  it("shows an unavailable status for an invalid response", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ data: { health: "NOT_OK" } }), { status: 200 }),
    );

    renderApp();

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("API status: unavailable");
    });
  });
});
