import Container from "@/components/container/Container";
import RegisterForm from "./RegisterForm";

async function RegisterPage() {
  return (
    <Container>
      <div className="mx-auto w-full max-w-[600px] bg-slate-100 mt-[80px]">
        <RegisterForm />
      </div>
    </Container>
  );
}

export default RegisterPage;
