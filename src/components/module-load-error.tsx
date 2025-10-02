import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ModuleLoadErrorProps {
  moduleName?: string;
  onRetry?: () => void;
}

export function ModuleLoadError({ moduleName, onRetry }: ModuleLoadErrorProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-[60vh] w-full px-4"
      )}
    >
      <Card className={cn("w-full max-w-lg border-destructive")}>
        <CardHeader className={cn("text-center space-y-4")}>
          <div className={cn("flex justify-center")}>
            <div className={cn("rounded-full bg-destructive/10 p-3")}>
              <AlertCircle className={cn("h-10 w-10 text-destructive")} />
            </div>
          </div>
          <div className={cn("space-y-2")}>
            <CardTitle className={cn("text-2xl text-destructive")}>
              Module Not Found
            </CardTitle>
            <CardDescription className={cn("text-base")}>
              {moduleName
                ? `Unable to load the "${moduleName}" module.`
                : "Unable to load the requested module."}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className={cn("space-y-4")}>
          <div className={cn("rounded-lg bg-muted p-4")}>
            <p className={cn("text-sm text-muted-foreground")}>
              This could be due to:
            </p>
            <ul
              className={cn(
                "mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside"
              )}
            >
              <li>Network connectivity issues</li>
              <li>Module server is offline or unavailable</li>
              <li>Incorrect module configuration</li>
              <li>CORS policy restrictions</li>
            </ul>
          </div>

          {onRetry && (
            <div
              className={cn(
                "flex flex-col sm:flex-row gap-3 justify-center pt-2"
              )}
            >
              <Button onClick={onRetry} className={cn("w-full sm:w-auto")}>
                <RefreshCw className={cn("mr-2 h-4 w-4")} />
                Retry Loading
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
                className={cn("w-full sm:w-auto")}
              >
                Go to Home
              </Button>
            </div>
          )}

          {!onRetry && (
            <div className={cn("flex justify-center pt-2")}>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
                className={cn("w-full sm:w-auto")}
              >
                Go to Home
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
