# Shell App

Host application for the movie ticket booking micro frontend architecture.

## Setup

### Installation

```bash
cd shell-app
pnpm install
```

### Development

```bash
pnpm run dev
```

Runs on `http://localhost:3000`

### Build

```bash
pnpm run build
pnpm run preview
```

## Architecture Decisions

### Module Federation

The shell app acts as the host application that dynamically loads remote micro frontends at runtime.

**Configuration:**
Remote modules are configured via environment variable `VITE_REMOTES` in `.env` file:

```json
{
  "remotes": [
    {
      "remoteName": "authApp",
      "url": "http://localhost:3001/assets/remoteEntry.js",
      "components": [
        { "componentName": "Login", "route": "/login" },
        { "componentName": "UserProfile", "route": "/profile" }
      ]
    },
    {
      "remoteName": "bookingApp",
      "url": "http://localhost:3002/assets/remoteEntry.js",
      "components": [
        { "componentName": "BookingForm", "route": "/booking" },
        { "componentName": "BookingList", "route": "/bookings" }
      ]
    },
    {
      "remoteName": "reportingApp",
      "url": "http://localhost:3003/assets/remoteEntry.js",
      "components": [
        { "componentName": "ReportingApp", "route": "/reports" }
      ]
    }
  ]
}
```

**Shared Dependencies:**
- `react`, `react-dom`, `react-router-dom` - Core libraries with singleton configuration
- `recharts` - Chart library for reporting app

All shared dependencies use `singleton: true` to ensure single instance across all federated modules, preventing React hooks errors.

### Technology Stack

- **React 19** with TypeScript
- **Vite** - Build tool and dev server
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first styling
- **Shadcn UI** - Component library (Card, Button, Select)
- **Module Federation** - Runtime dynamic loading of micro frontends
- **Zod** - Configuration validation

### Dynamic Remote Loading

**DynamicFederatedComponent:**
- Dynamically sets remote configuration at runtime
- Fetches remote module using `__federation_method_getRemote`
- Unwraps module with `__federation_method_unwrapDefault`
- Tracks loading/error states
- Re-fetches when route changes (dependency: remoteName, componentName, url)

**Error Handling:**
- Wraps each remote in `RemoteModuleErrorBoundary`
- Catches loading failures (network issues, offline modules)
- Displays user-friendly error messages
- Logs errors to console for debugging

### Responsive Design

Mobile-first layout with adaptive navigation:
- **Mobile:** Dropdown select menu for navigation
- **Desktop:** Horizontal button-based navigation
- Responsive header, footer, and content areas
- Flexible spacing and typography across breakpoints

## Communication Design

### Configuration-Driven Architecture

Shell app reads configuration from environment variables and dynamically:
1. Validates config against Zod schema
2. Creates routes for each remote component
3. Loads remotes on-demand when route accessed
4. Shares React context across all modules

### Route Management

**Dynamic Route Generation:**
```typescript
config.remotes.map(({ remoteName, url, components }) =>
  components.map((component) => (
    <Route
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
)
```

Routes automatically generated from configuration, enabling addition of new micro frontends without code changes.

### Layout Integration

**Consistent Layout:**
- All routes wrapped in shared `Layout` component
- Provides persistent header with navigation
- Responsive navigation (select on mobile, buttons on desktop)
- Footer with branding
- `<Outlet />` renders current route's remote component

**Navigation Links:**
Automatically generated from remote configuration:
```typescript
const navLinks = config.remotes.flatMap(remote =>
  remote.components.map(component => ({
    path: component.route,
    label: formatLabel(component.componentName)
  }))
);
```

### State Management

Shell app doesn't maintain application state. It delegates state management to:
- **storeApp** - Centralized Zustand store consumed by all micro frontends
- Each remote app imports `storeApp/store` independently
- State changes propagate automatically via Zustand subscriptions

### Cross-App Communication

**Indirect Communication:**
Shell app facilitates communication between micro frontends through:
1. **Shared Routes** - Navigation between remote apps
2. **Shared Store** - All apps consume same storeApp instance
3. **React Context** - Single React instance ensures context sharing
4. **Module Federation Runtime** - Coordinates shared dependencies

**No Direct Coupling:**
Remote apps don't communicate with shell-app directly. Shell-app is purely orchestration layer that loads remotes and provides routing infrastructure.

### Error Recovery

**RemoteModuleErrorBoundary:**
- Catches errors during remote loading
- Prevents entire app crash when one remote fails
- Displays module name in error message
- Allows other remotes to continue working
- Provides retry mechanism (unmount/remount component)

### Hot Module Replacement

During development, shell-app supports HMR for its own code but not for remote modules. Changes to remote apps require their dev servers to be running independently.
