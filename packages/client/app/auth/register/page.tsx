import Container from "@/components/container/Container";
import RegisterForm from "./RegisterForm";

async function RegisterPage() {
  return (
    <Container>
      <div className="mx-auto mt-[80px] w-full max-w-[600px] bg-slate-100">
        <RegisterForm />
      </div>
    </Container>
  );
}

export default RegisterPage;
