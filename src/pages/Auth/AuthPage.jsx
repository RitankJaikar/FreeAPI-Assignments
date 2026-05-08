import { useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import AuthForm from "./AuthForm";
import PageNotFound from "../PageNotFound";
import { BackToHome } from "../../components";
import { ShieldCheck, LogOut, User, Mail } from "lucide-react";

// --- Route Guard Helpers ---

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Checking auth...</p>;
  return user ? children : <Navigate to="/auth/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Checking auth...</p>;
  return !user ? children : <Navigate to="/auth/me" replace />;
};

function Me() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-400">Verifying your session...</div>
      </div>
    );

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm p-8 space-y-6">
        <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-blue-600/10 border border-blue-600/20">
          <User className="h-8 w-8 text-blue-400" />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Your account details</p>
        </div>

        {user ? (
          <>
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-lg">
                <User className="h-4 w-4 text-blue-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Username
                  </p>
                  <p className="text-slate-100 font-medium">{user.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-lg">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-slate-100 font-medium break-all">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full mt-6 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </>
        ) : (
          <div className="text-center space-y-4 pt-4">
            <p className="text-red-400 text-sm">No active session found</p>
            <Link
              to="/auth/login"
              className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function AuthContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (location.pathname === "/auth" || location.pathname === "/auth/") {
      navigate("/auth/me");
    }
  }, [location.pathname, navigate]);

  const currentPath = location.pathname.replace(/\/$/, "") || "/auth";
  const validPaths = ["/auth", "/auth/me", "/auth/login", "/auth/register"];
  const isValidAuthPath = validPaths.includes(currentPath);

  if (!isValidAuthPath) {
    return (
      <Routes>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }

  return (
    <div className="space-y-6">
      <BackToHome />

      {/* Header Badge Section */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-400">
          <ShieldCheck className="h-4 w-4 text-blue-400" />
          Authentication
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-white">
            {user ? "Account Settings" : "Secure Access"}
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            {user
              ? "Manage your account and view your profile information."
              : "Sign in to your account or create a new one to get started."}
          </p>
        </div>
      </section>

      <hr className="border-zinc-800" />

      {/* Navigation Tabs */}
      {!user && (
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => navigate("/auth/login")}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
              currentPath === "/auth/login"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-zinc-900/50 text-slate-300 border border-zinc-800 hover:border-zinc-700 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/auth/register")}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
              currentPath === "/auth/register"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-zinc-900/50 text-slate-300 border border-zinc-800 hover:border-zinc-700 hover:text-white"
            }`}
          >
            Create Account
          </button>
        </div>
      )}

      {/* Content Area */}
      <div className="flex justify-center py-8">
        <Routes>
          <Route index element={<Navigate to="me" replace />} />
          <Route
            path="me"
            element={
              <ProtectedRoute>
                <Me />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <AuthForm type="login" />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <AuthForm type="register" />
              </PublicRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

function AuthPage() {
  return (
    <AuthProvider>
      <AuthContent />
    </AuthProvider>
  );
}

export default AuthPage;
