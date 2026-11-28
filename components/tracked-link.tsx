"use client";

import Link, { type LinkProps } from "next/link";
import { useFlagsmith } from "@flagsmith/flagsmith/react";
import { useFlagsmithRuntime } from "@/components/flagsmith-provider";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type TrackedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "onClick"> & {
    eventName: "contact_clicked" | "live_demo_clicked";
    children: ReactNode;
  };

export function TrackedLink({ eventName, ...props }: TrackedLinkProps) {
  const runtime = useFlagsmithRuntime();

  if (!runtime.ready || runtime.preview) {
    return <Link {...props} />;
  }

  return <EnabledTrackedLink eventName={eventName} {...props} />;
}

function EnabledTrackedLink({ eventName, ...props }: TrackedLinkProps) {
  const flagsmith = useFlagsmith();

  return (
    <Link
      {...props}
      onClick={() => {
        flagsmith.trackEvent(eventName);
      }}
    />
  );
}
