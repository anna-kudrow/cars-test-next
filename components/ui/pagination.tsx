import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import type * as React from "react";

import { type Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
  variant?: "default" | "outline" | "ghost";
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  disabled,
  size = "icon",
  variant,
  ...props
}: PaginationLinkProps) {
  const resolvedVariant =
    variant ?? (disabled ? "ghost" : isActive ? "default" : "outline");

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: resolvedVariant,
          size,
        }),
        "pointer-events-auto rounded-full",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  disabled,
  className,
  ...props
}: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      disabled={disabled}
      variant={disabled ? "ghost" : "default"}
      className={cn("gap-1 rounded-full px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon className="size-3" />
    </PaginationLink>
  );
}

function PaginationNext({
  disabled,
  className,
  ...props
}: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      disabled={disabled}
      variant={disabled ? "ghost" : "default"}
      className={cn("gap-1 rounded-full px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <ChevronRightIcon className="size-3" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-9 items-end justify-center rounded-full bg-gray-400 opacity-50",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon className="size-4 text-gray-500" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
