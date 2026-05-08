import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { authService } from "./authService";
import { useAuth } from "./AuthContext";
import {
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";

export default function AuthForm({ type }) {
  const { setUser } = useAuth();
  const isRegister = type === "register";

  const [loginMethod, setLoginMethod] = useState(0); // 0: Username, 1: Email
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setServerError("");
    setServerSuccess("");
  }, [type]);

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");
    setServerSuccess("");

    console.group(`Auth Action: ${type.toUpperCase()}`);
    console.log("Form Data Submitted:", data);

    try {
      if (isRegister) {
        console.log("Step 1: Calling Register API...");
        const regRes = await authService.register(data);
        console.log("Registration Response:", regRes);
        setServerSuccess("Account created! Logging you in...");

        console.log("Step 2: Calling Auto-Login...");
        const loginRes = await authService.login({
          username: data.username,
          password: data.password,
        });
        console.log("Login Response:", loginRes);
        setUser(loginRes.data.user);
      } else {
        console.log("Calling Login API...");
        const loginRes = await authService.login(data);
        console.log("Login Response:", loginRes);
        setUser(loginRes.data.user);
        setServerSuccess("Login successful!");
      }
      console.log("🎉 SUCCESS: Auth flow completed.");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "An error occurred";
      console.error("❌ FAILED:", errorMsg);
      console.error("Full Error Object:", err);
      setServerError(errorMsg);
    } finally {
      setLoading(false);
      console.groupEnd();
    }
  };

  const toggleMethod = (m) => {
    setLoginMethod(m);
    setServerError("");
    setServerSuccess("");
    reset();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tab Switcher for Login Methods */}
      {!isRegister && (
        <div className="mb-8 flex gap-2 bg-zinc-900/50 p-1.5 rounded-lg border border-zinc-800">
          <button
            onClick={() => toggleMethod(0)}
            className={`flex-1 py-2.5 px-3 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
              loginMethod === 0
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Username
          </button>
          <button
            onClick={() => toggleMethod(1)}
            className={`flex-1 py-2.5 px-3 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
              loginMethod === 1
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Email
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Username Field */}
        {(isRegister || loginMethod === 0) && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-300">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                {...register("username", {
                  required: "Username is required",
                })}
                placeholder="Enter your username"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 outline-none transition-all"
                autoComplete="username"
              />
            </div>
            {errors.username && (
              <p className="flex items-center gap-1.5 text-red-400 text-sm mt-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.username.message}
              </p>
            )}
          </div>
        )}

        {/* Email Field */}
        {(isRegister || loginMethod === 1) && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 outline-none transition-all"
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="flex items-center gap-1.5 text-red-400 text-sm mt-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.email.message}
              </p>
            )}
          </div>
        )}

        {/* Password Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-300">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              placeholder={
                isRegister ? "Create a password" : "Enter your password"
              }
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 outline-none transition-all"
              autoComplete={isRegister ? "new-password" : "current-password"}
            />
          </div>
          {errors.password && (
            <p className="flex items-center gap-1.5 text-red-400 text-sm mt-1">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Feedback Messages */}
        {serverError && (
          <div className="bg-red-950/40 border border-red-500/30 backdrop-blur-sm p-3.5 rounded-lg flex gap-3">
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm">{serverError}</p>
          </div>
        )}

        {serverSuccess && (
          <div className="bg-green-950/40 border border-green-500/30 backdrop-blur-sm p-3.5 rounded-lg flex gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
            <p className="text-green-300 text-sm">{serverSuccess}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : isRegister ? (
            "Create Account"
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}
