import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  children: React.ReactNode;
}

export default function AuthCheckbox({ children, className, ...props }: AuthCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm text-white">
      <span className="relative mt-[1px] flex size-4 shrink-0">
        <input
          type="checkbox"
          className={cn(
            "peer size-4 cursor-pointer appearance-none rounded border border-white bg-transparent transition-colors checked:border-pb-gold checked:bg-pb-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-pb-gold",
            className,
          )}
          {...props}
        />
        <Check
          strokeWidth={3}
          className="pointer-events-none absolute inset-0 m-auto size-3 text-black opacity-0 peer-checked:opacity-100"
        />
      </span>
      <span className="leading-normal">{children}</span>
    </label>
  );
}
