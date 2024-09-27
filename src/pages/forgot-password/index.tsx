import GenerateMetaData from '@/components/GenerateMetaData';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success('Password reset link sent to your email');
      setIsLoading(false);
    } else {
      toast.error('Error: ' + data.message);
      setIsLoading(false);
    }
  };

  return (
    <section className="flex gap-4 justify-center min-h-screen items-center">
      <GenerateMetaData title="Sign In" desc="Sign In Page" />
      <div className="w-full lg:w-3/5">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Forgot Password
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email to reset password.
          </Typography>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Email
            </Typography>
            <Input
              crossOrigin={"email"}
              type="email"
              size="lg"
              placeholder="name@mail.com"
              className=" !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="mt-6" loading={isLoading} fullWidth>
            Send Email
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
