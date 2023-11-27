import Container from "@/components/container/Container";
import LoginForm from "./LoginForm";

async function LoginPage() {
  return (
    <Container>
      <div className="mx-auto mt-[80px] w-full max-w-[600px] bg-slate-100">
        <LoginForm />
      </div>
    </Container>
  );
}

export default LoginPage;
