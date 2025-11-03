import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import type { LoginDto } from "@/lib/types";
import { BookOpen, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginDto>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginDto) => {
    setIsLoading(true);
    setApiError("");
    try {
      await login(data);
      navigate("/books");
    } catch (error: any) {
      setApiError(error.message || "Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card/30 to-background px-4">
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-border/50 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary via-primary to-orange-600 shadow-[0_0_30px_rgba(255,136,0,0.6)]">
            <BookOpen className="w-8 h-8 text-primary-foreground drop-shadow-lg" />
          </div>
          <CardTitle className="text-3xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Login to access your library account
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

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                {...register("email", {
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

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full shadow-[0_0_20px_rgba(255,136,0,0.3)] hover:shadow-[0_0_30px_rgba(255,136,0,0.5)]"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline font-semibold">
                Register here
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

