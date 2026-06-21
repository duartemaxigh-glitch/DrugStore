import "./Login.css";
import { Toaster } from "sonner";
import { useLogin } from "@/features/login/useLogin";

export default function Login() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        cargando,
        manejarSubmit
    } = useLogin()

    return (
        <div className="login-page">
            <div className="login-wrapper">
                <div className="login-card">
                    <div className="login-logo">
                        <span className="login-logo__icon">🏪</span>
                        <h1 className="login-logo__title">CRUDrugstore</h1>
                        <p className="login-logo__subtitle">Sistema de Gestión</p>
                    </div>

                    <form onSubmit={manejarSubmit} className="login-form">
                        <div className="login-form__campo">
                            <label className="login-form__label">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="tu@email.com"
                                className="login-form__input"
                            />
                        </div>

                        <div>
                        <label className="login-form__label">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="login-form__input"
                        />
                        </div>

                        <button type="submit" disabled={cargando} className="login-btn">
                            {cargando ? (
                                <span className="login-btn__cargando">
                                    <span className="login-btn__spinner"/>
                                    Ingresando...
                                </span>
                            ) : (
                                "Ingresar"
                            )}
                        </button>
                    </form>
                </div>
                
                <p className="login-footer">
                    Clean Architecture con Python + React.js
                </p>
            </div>
            <Toaster/>
        </div>
    );
}