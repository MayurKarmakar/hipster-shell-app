import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

interface RemoteModuleErrorBoundaryProps {
  children: ReactNode;
  moduleName: string;
}

function ErrorFallback({
  error,
  moduleName,
}: FallbackProps & { moduleName: string }) {
  const isChunkLoadError =
    error?.message?.includes("Failed to fetch dynamically imported module") ||
    error?.message?.includes("Loading chunk") ||
    error?.name === "ChunkLoadError";

  const displayName = moduleName.split('/').pop() || moduleName;

  return (
    <Card className="w-full max-w-md mx-auto border-destructive">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-destructive">
            {displayName} module failed to load
          </CardTitle>
        </div>
        <CardDescription>
          {isChunkLoadError
            ? `The ${displayName} module failed to load. This could be due to network issues or the module being offline.`
            : `An error occurred while loading the ${displayName} module.`}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default function RemoteModuleErrorBoundary({
  children,
  moduleName,
}: RemoteModuleErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={(props) => (
        <ErrorFallback {...props} moduleName={moduleName} />
      )}
      onError={(error, errorInfo) => {
        console.error(`[${moduleName}] Error:`, error);
        console.error(`[${moduleName}] Error Info:`, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
