import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AuthApi } from "@/api/auth-api";
import { Link } from "react-router";
import { useAuth } from "@/contexts/auth/use-auth";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchMe } = useAuth();

  const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setEmail(event.target.value);
  };

  const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    try {
      event.preventDefault();
      await AuthApi.signup({ email, password });
      await fetchMe();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign up to Code-Vault Inc.</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email and password below to sign up
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            onChange={handleChangeEmail}
            autoComplete="email"
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            onChange={handleChangePassword}
            autoComplete="new-password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={!email || !password}>
          Signup
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?
        <Link to="/login" className="underline underline-offset-4 ml-1">
          Login
        </Link>
      </div>
    </form>
  );
}
