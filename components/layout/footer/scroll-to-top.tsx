"use client";

import { ArrowUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToTop } from "@/lib/utils";

function ScrollToTop() {
  return (
    <Button onClick={scrollToTop} size="icon">
      <ArrowUpIcon />
    </Button>
  );
}

export default ScrollToTop;
