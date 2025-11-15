import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import AuthLayout from "@/Layouts/auth-layout";
import { Head, useForm, usePage } from "@inertiajs/react";



interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}
export default function Login() {

    const { data, setData, post, processing, errors } = useForm<LoginFormData>({
        email: '',
        password: '',
        remember: false,
    });


    const { canResetPassword} = usePage<{ canResetPassword: boolean }>().props;

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        post('/login' , {
            preserveState : true,
            onSuccess: () => {
                setData('password' , '');
            }
        });
    };

    const handleRememberChange = (checked: boolean) => {
      setData('remember', checked === true);
    };

  return (
    <AuthLayout
            title="Log in to your account"
            description="Enter your email and password below to log in"
    >
        <Head title="Log in" />

        <form className="grid gap-6" onSubmit={handleSubmit}>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="email"
                        placeholder="email@example.com"
                        value={data.email}
                        onChange={(e) => setData('email' , e.target.value)}
                    />
                    <InputError message={errors.email ?? ''} />
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        {canResetPassword && (
                            <TextLink
                                    href='/forgot-password'
                                    className="ml-auto text-sm"
                                >
                                    Forgot password?
                            </TextLink>
                        )}
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                        tabIndex={2}
                        autoComplete="current-password"
                        placeholder="Password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password ?? ''} />
                </div>
                <div className="flex items-center space-x-3">
                    <Checkbox
                        name="remember"
                        onCheckedChange={handleRememberChange}
                    />
                    <Label htmlFor="remember">Remember me</Label>
                </div>

                <Button
                        type="submit"
                        className="mt-4 w-full"
                        tabIndex={4}
                        disabled={processing}
                        data-test="login-button"
                    >
                        {processing && <Spinner />}
                        Log in
                </Button>

        </form>

    </AuthLayout>
  )
}
