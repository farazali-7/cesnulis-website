"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const zurichTime = new Intl.DateTimeFormat("de-CH", {
  timeZone: "Europe/Zurich",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * Live local time in Zürich. Renders a fixed-width placeholder on the server
 * pass so hydration never shifts the register line.
 */
function LocalTime({ className, ...props }: React.ComponentProps<"time">) {
  const [time, setTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    const tick = () => setTime(zurichTime.format(new Date()));

    tick();
    const timer = window.setInterval(tick, 30_000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <time
      data-slot="local-time"
      className={cn("tabular-nums", className)}
      {...props}
    >
      {time ?? "--:--"}
    </time>
  );
}

export { LocalTime };
