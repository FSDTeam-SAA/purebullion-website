"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormModal } from "../../../_components/shared/FormModal";
import { toast } from "sonner";
import { btn, btnLight } from "../btn";

type Props = { open: boolean; onOpenChange: (o: boolean) => void };

const field =
  "h-12 rounded-lg border-[#a37b3c] bg-transparent px-3 text-[16px] text-pb-muted shadow-none placeholder:text-pb-muted focus-visible:ring-0";

export function PaymentMethodModal({ open, onOpenChange }: Props) {
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Update payment method"
      iconSrc="/icons/subscription/card-bold.svg"
      footer={
        <>
          <Button variant="light" className={btnLight} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="gold"
            className={btn}
            onClick={() => {
              toast.info("Card updates are handled by our payment provider and aren't available yet.");
              onOpenChange(false);
            }}
          >
            Save Card
          </Button>
        </>
      }
    >
      <div className="text-[12px] font-bold leading-[1.2] text-[#8a9499]">
        <p>
          Card details are stored securely by our payment provider. Online card updates are not enabled yet; billing currently runs on the
          payment method used at checkout.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="card-number" className="text-[16px] leading-[1.2] text-pb-muted">
          Update payment method
        </label>
        <div className="relative">
          <Image src="/icons/subscription/card.svg" alt="" width={20} height={20} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
          <Input id="card-number" placeholder="4242 4242 4242 4242" inputMode="numeric" className={`${field} pl-10`} />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="card-expiry" className="text-[16px] leading-[1.2] text-pb-muted">Expiry</label>
          <Input id="card-expiry" placeholder="mm/yyyy" className={field} />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="card-cvc" className="text-[16px] leading-[1.2] text-pb-muted">CVC</label>
          <Input id="card-cvc" placeholder="123" inputMode="numeric" className={field} />
        </div>
      </div>
    </FormModal>
  );
}
