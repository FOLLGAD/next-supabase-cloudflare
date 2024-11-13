import { cn } from "@polaris/ui";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

function TextSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <span
      className={cn(
        "block w-full animate-pulse rounded-md bg-primary/10",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton, TextSkeleton };
