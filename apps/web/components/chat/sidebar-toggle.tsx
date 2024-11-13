import { ComponentProps } from "react";

import { Button } from "@polaris/ui/button";
import { SidebarTrigger, useSidebar } from "@polaris/ui/sidebar";
import { BetterTooltip } from "@polaris/ui/tooltip";

import { SidebarLeftIcon } from "./icons";

export function SidebarToggle({
  className,
}: ComponentProps<typeof SidebarTrigger>) {
  const { toggleSidebar } = useSidebar();

  return (
    <BetterTooltip content="Toggle Sidebar" align="start">
      <Button
        onClick={toggleSidebar}
        variant="outline"
        className="md:h-fit md:px-2"
      >
        <SidebarLeftIcon size={16} />
      </Button>
    </BetterTooltip>
  );
}
