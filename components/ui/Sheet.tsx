"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SheetProps = {
  open: boolean;
  onClose: () => void;
  labelledBy?: string;
  label?: string;
  /** Positions the <dialog> itself (e.g. "ml-auto h-full"). */
  className?: string;
  panelClassName?: string;
  /** CSS transform the panel slides in from, e.g. "translateX(100%)". */
  from?: string;
  children: ReactNode;
};

/**
 * Native <dialog> as a modal: the browser handles focus trapping, Escape, the top layer
 * and returning focus. We add backdrop-click to close, a scroll lock and CSS enter/exit transitions.
 */
export function Sheet({ open, onClose, labelledBy, label, className, panelClassName, from, children }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => {
      document.documentElement.style.overflow = "";
      onCloseRef.current();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cn("sheet", className)}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className={cn("sheet-panel", panelClassName)} style={{ "--from": from } as CSSProperties}>
        {children}
      </div>
    </dialog>
  );
}
