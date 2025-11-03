import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import type { RegisterDto } from "@/lib/types";
import { BookOpen, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const { register: formRegister, handleSubmit, formState: { errors }, watch } = useForm<RegisterDto>();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const password = watch("password") || "";

  const onSubmit = async (data: RegisterDto) => {
    setIsLoading(true);
    setApiError("");
    try {
      await registerUser(data);
      navigate("/books");
    } catch (error: any) {
      setApiError(error.message || "Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card/30 to-background px-4 py-8">
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-2xl relative z-10 shadow-2xl border-border/50 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary via-primary to-orange-600 shadow-[0_0_30px_rgba(255,136,0,0.6)]">
            <BookOpen className="w-8 h-8 text-primary-foreground drop-shadow-lg" />
          </div>
          <CardTitle className="text-3xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Join our library community today
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {apiError && (
              <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-md flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{apiError}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  placeholder="John"
                  {...formRegister("firstname", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters"
                    }
                  })}
                  className={errors.firstname ? "border-destructive" : ""}
                />
                {errors.firstname && (
                  <p className="text-sm text-destructive">{errors.firstname.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  placeholder="Doe"
                  {...formRegister("lastname", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters"
                    }
                  })}
                  className={errors.lastname ? "border-destructive" : ""}
                />
                {errors.lastname && (
                  <p className="text-sm text-destructive">{errors.lastname.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                {...formRegister("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  {...formRegister("phone")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  {...formRegister("age", {
                    required: "Age is required",
                    min: {
                      value: 13,
                      message: "You must be at least 13 years old"
                    },
                    max: {
                      value: 120,
                      message: "Please enter a valid age"
                    },
                    valueAsNumber: true
                  })}
                  className={errors.age ? "border-destructive" : ""}
                />
                {errors.age && (
                  <p className="text-sm text-destructive">{errors.age.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...formRegister("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: "Password must contain uppercase, lowercase, and number"
                  }
                })}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...formRegister("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match"
                })}
                className={errors.confirmPassword ? "border-destructive" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full shadow-[0_0_20px_rgba(255,136,0,0.3)] hover:shadow-[0_0_30px_rgba(255,136,0,0.5)]"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Login here
              </Link>
            </p>
            <p className="text-sm text-center text-muted-foreground">
              <Link to="/" className="text-primary hover:underline">
                ← Back to home
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

