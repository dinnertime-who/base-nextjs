import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useFormContext } from "../app-form";

type Props = Omit<React.ComponentProps<"button">, "type" | "disabled"> & {
  submittingNode?: React.ReactNode;
};

export const SubmitButton = ({
  className,
  submittingNode = <Spinner />,
  children,
  ...props
}: Props) => {
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => (
        <Button
          className={cn(className, "w-full")}
          type="submit"
          disabled={!canSubmit}
          {...props}
        >
          {isSubmitting ? submittingNode : children}
        </Button>
      )}
    />
  );
};
