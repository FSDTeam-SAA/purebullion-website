import { cn } from "@/lib/utils";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use the narrower 1320px content width with Figma's 60px side gutters. */
  as?: "div" | "section";
}

/** Standard page gutter: 16px on mobile → 60px on desktop, content max 1320px. */
export default function PageContainer({
  as: Tag = "div",
  className,
  ...props
}: PageContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-[60px]",
        className,
      )}
      {...props}
    />
  );
}
