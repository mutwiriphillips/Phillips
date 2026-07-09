import { AdminDashboard } from "./AdminDashboard";

// Login gate is disabled for now (trial run) — was: token ? <AdminDashboard /> : <AdminLogin />.
// AdminLogin.tsx and lib/auth.tsx are untouched, so re-enabling later is a one-line revert here
// (see the comment above requireAdmin in backend/src/middleware/auth.ts for the other half).
export function AdminPage() {
  return <AdminDashboard />;
}
