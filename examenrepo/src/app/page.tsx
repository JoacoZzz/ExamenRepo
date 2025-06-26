
"use client";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function Login() {
  const { login } = useApp();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    if (login(data.get("user") as string, data.get("pass") as string)) {
      router.push("/");
    } else {
      alert("datos incorrectos");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input name="user" placeholder="Usuario"  required />
      <input name="pass" type="password" placeholder="Contraseña" required />
      <button >Ingresar</button>
    </form>
  );
}
