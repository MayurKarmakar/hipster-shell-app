import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function SuspenseFallback() {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-[60vh] w-full px-4"
      )}
    >
      <Card className={cn("w-full max-w-md border-none shadow-lg")}>
        <CardContent
          className={cn(
            "flex flex-col items-center justify-center py-12 space-y-4"
          )}
        >
          <Loader2 className={cn("h-12 w-12 animate-spin text-primary")} />
          <div className={cn("text-center space-y-2")}>
            <h3 className={cn("text-lg font-semibold text-foreground")}>
              Loading Module
            </h3>
            <p className={cn("text-sm text-muted-foreground")}>
              Please wait while we load the component...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
