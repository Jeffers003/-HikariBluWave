import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type PrimaryButtonProps = ComponentProps<typeof Button>;

export default function PrimaryButton({
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      className={cn(
        `
        rounded-xl
        bg-[#046AEE]
        px-7
        py-6
        text-white
        transition-all
        duration-300

        hover:bg-[#0357C4]
        hover:shadow-[0_0_30px_rgba(4,106,238,.35)]
        `,
        className
      )}
      {...props}
    />
  );
}