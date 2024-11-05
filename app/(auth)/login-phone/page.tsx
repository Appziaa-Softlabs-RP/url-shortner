import { LoginWithPhoneStepper } from "@/components/forms/auth-forms/login-with-otp-form-stepper";

export default async function AuthenticationPage() {

  return (
    <>
      <LoginWithPhoneStepper />
      {/* <div className="fixed bottom-0 -z-10 min-w-full">
        <Image
          src="/img/auth-bg.svg"
          alt=""
          className="min-w-full"
          width={800}
          height={800}
        />
      </div> */}
    </>
  );
}