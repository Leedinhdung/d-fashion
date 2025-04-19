import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../components/ui/Button';
import { useRegister, useLogin } from '../../hooks/auth/useAuth';
import { RegisterFormFields, registerSchema, loginSchema, LoginFormFields } from '../../validations/auth';
import { Eye, EyeOff } from 'lucide-react';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const { mutateAsync: registerUser } = useRegister();
    const { mutateAsync: loginUser } = useLogin();

    const schema = isLogin ? loginSchema : registerSchema;
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormFields | RegisterFormFields>({
        resolver: zodResolver(schema),
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit: SubmitHandler<LoginFormFields | RegisterFormFields> = async (data) => {
        try {
            if (isLogin) {
                await loginUser(data); // Hook đã xử lý lưu token/user
            } else {
                await registerUser(data);
                setIsLogin(true);
            }
        } catch (error: any) {
            console.error('Error details:', error.response, error.message);
            setError('root', {
                type: 'manual',
                message: error.response || 'Something went wrong',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md">
                <div className="bg-white px-8 py-12 shadow-sm rounded-lg">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            {isLogin ? 'Sign in to your account' : 'Create a new account'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {isLogin ? (
                                <>
                                    Don't have an account?{' '}
                                    <button onClick={() => setIsLogin(false)} className="text-blue-900 hover:text-blue-800 font-medium">
                                        Sign up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <button onClick={() => setIsLogin(true)} className="text-blue-900 hover:text-blue-800 font-medium">
                                        Sign in
                                    </button>
                                </>
                            )}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {errors.root && <p className="text-sm text-secondaryRed">{errors.root.message}</p>}

                        {!isLogin && (
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name')}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                    disabled={isSubmitting}
                                />
                                {errors.name && <p className="text-sm text-secondaryRed mt-1">{errors.name.message}</p>}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email')}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                disabled={isSubmitting}
                            />
                            {errors.email && <p className="text-sm text-secondaryRed mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative w-full">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password')}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                    disabled={isSubmitting}
                                />
                                {showPassword ? (
                                    <Eye
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1 translate-y-1/3 transform cursor-pointer text-gray-500"
                                    />
                                ) : (
                                    <EyeOff
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1 translate-y-1/3 transform cursor-pointer text-gray-500"
                                    />
                                )}
                            </div>
                            {errors.password && <p className="text-sm text-secondaryRed mt-1">{errors.password.message}</p>}
                        </div>

                        {!isLogin && (
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password_confirmation')}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                    disabled={isSubmitting}
                                />
                                {errors.password_confirmation && (
                                    <p className="text-sm text-secondaryRed mt-1">{errors.password_confirmation.message}</p>
                                )}
                            </div>
                        )}

                        <Button type="submit" fullWidth disabled={isSubmitting}>
                            {isSubmitting ? 'Loading...' : isLogin ? 'Sign in' : 'Register'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Auth;