import { cn } from "@/lib/utils";

interface AuthCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  children: React.ReactNode;
}

export default function AuthCheckbox({ children, className, ...props }: AuthCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm text-white">
      <input
        type="checkbox"
        className={cn(
          "mt-[1px] size-4 shrink-0 cursor-pointer appearance-none rounded border border-white bg-transparent checked:border-pb-gold checked:bg-pb-gold checked:bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='black' stroke-width='2'%3E%3Cpath d='M3.5 8.5l3 3 6-6.5'/%3E%3C/svg%3E\")]",
          className,
        )}
        {...props}
      />
      <span className="leading-normal">{children}</span>
    </label>
  );
}
