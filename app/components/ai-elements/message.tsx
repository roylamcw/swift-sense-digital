"use client";

import { memo, type ComponentProps } from "react";
import { Streamdown } from "streamdown";

type MessageResponseProps = ComponentProps<typeof Streamdown>;

export const MessageResponse = memo(
  ({ className = "", mode = "streaming", ...props }: MessageResponseProps) => (
    <Streamdown
      className={`space-y-2 text-sm leading-6 [&_a]:font-semibold [&_a]:text-blue-700 [&_a]:underline [&_li]:ml-4 [&_ol]:list-decimal [&_p]:m-0 [&_ul]:list-disc ${className}`}
      mode={mode}
      {...props}
    />
  )
);

MessageResponse.displayName = "MessageResponse";
