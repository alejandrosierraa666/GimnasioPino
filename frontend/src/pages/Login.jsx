import useAuth from "../hooks/useAuth";

const Login = () => {
    const { handleSubmit, handleInputChange, loginData } = useAuth();

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-8">
                    {/* Logo / Título */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-semibold bg-emerald-600 text-white py-2 px-4 rounded-lg">
                            Iniciar Sesión
                        </h1>
                        <p className="text-zinc-600 mt-1">Ingresa tus datos para continuar</p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Correo */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleInputChange}
                                required
                                className="w-full border border-zinc-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 transition-colors outline-none"
                                placeholder="tu@email.com"
                                value={loginData.email}
                            />
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="contrasenna"
                                onChange={handleInputChange}
                                required
                                className="w-full border border-zinc-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 transition-colors outline-none"
                                placeholder="••••••••"
                                value={loginData.contrasenna}
                            />
                        </div>

                        {/* Opciones */}
                        <div className="flex items-center justify-center text-sm">
                            <a href="#" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-medium py-3.5 rounded-xl text-base"
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    {/* Registro */}
                    <div className="text-center mt-6 text-sm">
                        <p className="text-zinc-600">
                            ¿No tienes cuenta?{' '}
                            <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                                Regístrate
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-zinc-500 text-xs mt-6">
                    © 2026 Gimnasio Olympo
                </p>
            </div>
        </div>
    );
};

export default Login;