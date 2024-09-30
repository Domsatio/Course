import { useState } from 'react';
import { useRouter } from 'next/router';
import GenerateMetaData from '@/components/GenerateMetaData';
import { Button, Input, Typography } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import { resetPasswordServices } from '@/services/serviceGenerator';

const ResetPassword = () => {
  const { push, query: { token } } = useRouter();
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)

    if (newPassword !== confirmNewPassword) {
      setIsLoading(false)
      return toast.error('Passwords do not match');
    }

    try {
      const { data } = await resetPasswordServices.resetPassword(token as string, newPassword)
      toast.success(data.message)
      push('/sign-in')
    } catch (error: any) {
      setIsLoading(false);
      toast.error('Error: ' + error.message);
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <section className="flex gap-4 justify-center min-h-screen items-center">
      <GenerateMetaData title="Reset Password" desc="Reset Password Page" />
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
            Enter your new password to reset.
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
              New Password
            </Typography>
            <Input
              crossOrigin={"newPassword"}
              name='newPassword'
              id='newPassword'
              type="password"
              size="lg"
              placeholder="**********"
              className=" !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Confirm New Password
            </Typography>
            <Input
              crossOrigin={"confirmNewPassword"}
              name='confirmNewPassword'
              id='confirmNewPassword'
              type="password"
              size="lg"
              placeholder="**********"
              className=" !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="mt-6" loading={isLoading} fullWidth>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
