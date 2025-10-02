import { Suspense, useEffect, useState, type FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import {
  __federation_method_getRemote as getRemote,
  __federation_method_setRemote as setRemote,
  __federation_method_unwrapDefault as unwrapModule,
} from "virtual:__federation__";
import z from "zod";
import Layout from "./components/Layout";
import RemoteModuleErrorBoundary from "./components/RemoteModuleErrorBoundary";
import "./index.css";
import Home from "./pages/Home";

function DynamicFederatedComponent(input: {
  remoteName: string;
  componentName: string;
  url: string;
}) {
  const { remoteName, componentName, url } = input;

  const [DynamicRemote, setDynamicRemote] = useState<FunctionComponent>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setDynamicRemote(undefined);
    setError(null);

    setRemote(remoteName, {
      url: () => Promise.resolve(url),
      format: "esm",
      from: "vite",
    });

    getRemote(remoteName, `./${componentName}`)
      .then((moduleWrapped) => unwrapModule(moduleWrapped))
      .then((module) => {
        // @ts-ignore
        setDynamicRemote(() => module);
      })
      .catch((err) => {
        setError(err);
      });
  }, [remoteName, componentName, url]);

  if (error) {
    throw error;
  }

  if (DynamicRemote) {
    return (
      <>
        <Suspense fallback={<div>Loading fallback</div>}>
          <DynamicRemote />
        </Suspense>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

const shellAppConfigSchema = z.object({
  remotes: z.array(
    z.object({
      remoteName: z.string(),
      url: z.string(),
      components: z.array(
        z.object({
          componentName: z.string(),
          route: z.string(),
        })
      ),
    })
  ),
});

export type ShellAppConfig = z.infer<typeof shellAppConfigSchema>;

function getConfig() {
  const viteRemotes = import.meta.env.VITE_REMOTES;
  let json;
  try {
    json = JSON.parse(viteRemotes);
  } catch (e) {
    throw new Error(`Failed to parse VITE_REMOTES`, {
      cause: e,
    });
  }
  const validated = shellAppConfigSchema.safeParse(json);
  if (validated.error) {
    throw new Error(`Failed to validated VITE_REMOTES`, {
      cause: validated.error,
    });
  }

  return validated.data;
}

function ShellRoutes({ config }: { config: ShellAppConfig }) {
  return (
    <Routes>
      <Route path="/" element={<Layout config={config} />}>
        <Route index element={<Home />} />
        {config.remotes.map(({ remoteName, url, components }) =>
          components.map((component) => (
            <Route
              key={component.route}
              path={component.route}
              element={
                <RemoteModuleErrorBoundary moduleName={`${remoteName}/${component.componentName}`}>
                  <DynamicFederatedComponent
                    remoteName={remoteName}
                    url={url}
                    componentName={component.componentName}
                  />
                </RemoteModuleErrorBoundary>
              }
            />
          ))
        )}
      </Route>
    </Routes>
  );
}

function App() {
  let [config, setConfig] = useState<ShellAppConfig>();

  useEffect(() => {
    try {
      const config = getConfig();
      setConfig(config);
      console.log(config);
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!config) {
    return <div>Loading ...</div>;
  }
  return <ShellRoutes config={config} />;
}

export default App;
