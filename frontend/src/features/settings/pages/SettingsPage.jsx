import { useState } from "react";
import {
  Eye,
  EyeOff,
  KeyRound,
  Shield
} from "lucide-react";
import {
  useToast
} from "../../../shared/components/feedback/toastContext";
import Spinner from "../../../shared/components/states/Spinner";
import {
  getFriendlyErrorMessage,
  handleSessionExpired,
  isUnauthorizedError
} from "../../../utils/session";
import { changePassword } from "../api/changePassword";

function SettingsPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const toast = useToast();

  // Validate the inputs before calling the API
  function validateForm() {
    const newErrors = {};

    if (!oldPassword) {
      newErrors.oldPassword = "Current password is required";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await changePassword({
        oldPassword,
        newPassword
      });

      toast.success("Password updated successfully");
      
      // Clear form fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      // Reset visibility states
      setShowOldPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (err) {
      console.error("Password change error:", err);

      if (isUnauthorizedError(err)) {
        handleSessionExpired(toast);
        return;
      }

      // Handle specific backend status codes or formats
      let friendlyMessage;
      
      if (err.status === 400) {
        friendlyMessage = "Current password is incorrect";
      } else {
        friendlyMessage = getFriendlyErrorMessage(err, "Failed to update password");
      }

      setFormError(friendlyMessage);
      toast.error(friendlyMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 py-4 animate-in fade-in duration-300">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
            <Shield className="size-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Settings
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your account security and password settings
            </p>
          </div>
        </div>
      </div>

      {/* Main Security Card */}
      <div className="max-w-md mx-auto mt-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <KeyRound className="size-4.5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Change Password
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your account password securely
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs font-medium text-red-600 animate-in fade-in slide-in-from-top-1">
                  {formError}
                </div>
              )}

              {/* Current Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                      if (errors.oldPassword) {
                        setErrors((prev) => ({ ...prev, oldPassword: "" }));
                      }
                    }}
                    disabled={loading}
                    placeholder="Enter current password"
                    className={`w-full border rounded-xl pl-4 pr-11 py-2.5 text-sm outline-none transition-all duration-200 bg-white placeholder-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 disabled:bg-slate-50 disabled:cursor-not-allowed ${
                      errors.oldPassword ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-slate-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    disabled={loading}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none disabled:cursor-not-allowed"
                    aria-label={showOldPassword ? "Hide password" : "Show password"}
                  >
                    {showOldPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                  </button>
                </div>
                {errors.oldPassword && (
                  <p className="text-xs font-medium text-red-600 animate-in fade-in duration-200">
                    {errors.oldPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (errors.newPassword) {
                        setErrors((prev) => ({ ...prev, newPassword: "" }));
                      }
                    }}
                    disabled={loading}
                    placeholder="Enter new password"
                    className={`w-full border rounded-xl pl-4 pr-11 py-2.5 text-sm outline-none transition-all duration-200 bg-white placeholder-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 disabled:bg-slate-50 disabled:cursor-not-allowed ${
                      errors.newPassword ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-slate-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    disabled={loading}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none disabled:cursor-not-allowed"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-xs font-medium text-red-600 animate-in fade-in duration-200">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) {
                        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                      }
                    }}
                    disabled={loading}
                    placeholder="Confirm new password"
                    className={`w-full border rounded-xl pl-4 pr-11 py-2.5 text-sm outline-none transition-all duration-200 bg-white placeholder-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 disabled:bg-slate-50 disabled:cursor-not-allowed ${
                      errors.confirmPassword ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-slate-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none disabled:cursor-not-allowed"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs font-medium text-red-600 animate-in fade-in duration-200">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition duration-200 font-semibold text-sm disabled:cursor-not-allowed disabled:opacity-60 shadow-sm shadow-emerald-700/10 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Spinner className="size-4 text-white" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <span>Change Password</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
