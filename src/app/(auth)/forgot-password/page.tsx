'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Password Reset Email Sent",
        description: "Please check your inbox for instructions to reset your password.",
    });
    router.push('/login');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Forgot Password</CardTitle>
        <CardDescription>Enter your email and we'll send you a link to reset your password.</CardDescription>
      </CardHeader>
      <form onSubmit={handleReset}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="farmer@example.com" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full">Send Reset Link</Button>
           <div className="text-sm text-center text-muted-foreground">
            Remembered your password?{" "}
            <Link href="/login" passHref>
              <Button variant="link" className="p-0 h-auto">Login</Button>
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
