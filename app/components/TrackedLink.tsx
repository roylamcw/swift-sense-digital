"use client";

import type { AnchorHTMLAttributes } from "react";
import {
  trackConversionEvent,
  type ConversionEventName,
} from "./conversion-tracking";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: ConversionEventName;
  eventProperties?: Record<string, string | number | boolean>;
};

export default function TrackedLink({
  eventName,
  eventProperties,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackConversionEvent(eventName, eventProperties);
        onClick?.(event);
      }}
    />
  );
}
