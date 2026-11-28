"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createFlagsmithInstance } from "@flagsmith/flagsmith";
import { FlagsmithProvider } from "@flagsmith/flagsmith/react";

const flagsmith = createFlagsmithInstance();

type FlagsmithRuntime = {
  ready: boolean;
  preview: boolean;
};

const FlagsmithRuntimeContext = createContext<FlagsmithRuntime>({
  ready: false,
  preview: false,
});

let memoryVisitorId: string | undefined;

function getVisitorId() {
  try {
    const storedId = window.localStorage.getItem("visitor_id");
    if (storedId) {
      memoryVisitorId = storedId;
      return storedId;
    }

    const visitorId = memoryVisitorId ?? crypto.randomUUID();
    window.localStorage.setItem("visitor_id", visitorId);
    memoryVisitorId = visitorId;
    return visitorId;
  } catch {
    memoryVisitorId ??= crypto.randomUUID();
    return memoryVisitorId;
  }
}

export function useFlagsmithRuntime() {
  return useContext(FlagsmithRuntimeContext);
}

export function FlagsmithClientProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<{
    identity: string;
    preview: boolean;
  } | null>(null);

  useEffect(() => {
    // Load browser-only identity after hydration so server rendering stays safe.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession({
      identity: getVisitorId(),
      preview: new URLSearchParams(window.location.search).has("preview"),
    });
  }, []);

  const runtime = {
    ready: session !== null,
    preview: session?.preview ?? false,
  };

  return (
    <FlagsmithRuntimeContext.Provider value={runtime}>
      {session && !session.preview ? (
        <FlagsmithProvider
          flagsmith={flagsmith}
          options={{
            environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_ENV_ID,
            identity: session.identity,
            enableEvents: true,
          }}
        >
          {children}
        </FlagsmithProvider>
      ) : (
        children
      )}
    </FlagsmithRuntimeContext.Provider>
  );
}
