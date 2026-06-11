"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useMediaQuery } from "@/components/use-media-query";

export function ResponsiveDetail({
  open,
  onOpenChange,
  title,
  description,
  logo,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  logo?: React.ReactNode;
  children: React.ReactNode;
}) {
  const desktop = useMediaQuery("(min-width: 768px)");
  if (desktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto rounded-3xl p-0">
          <DialogHeader className="border-b bg-secondary/35 p-7 text-left">
            <DialogTitle className="flex items-center gap-3.5 font-display text-3xl animate-fade-in">
              {logo}
              <span>{title}</span>
            </DialogTitle>
            <DialogDescription className="mt-2 text-base leading-7">{description}</DialogDescription>
          </DialogHeader>
          <div className="p-7">{children}</div>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto rounded-t-[2rem] p-0">
        <SheetHeader className="border-b bg-secondary/35 p-6 text-left">
          <SheetTitle className="flex items-center gap-3 font-display text-3xl">
            {logo}
            <span>{title}</span>
          </SheetTitle>
          <SheetDescription className="mt-2 text-base leading-7">{description}</SheetDescription>
        </SheetHeader>
        <div className="p-6">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

