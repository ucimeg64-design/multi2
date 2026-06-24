// app/page.js
"use client";
import { useState } from "react";
import InputField from './components/input';

export default function Home() {
  const [userInformation, setUserInformation] = useState({
    firstName: "",
    lastName: "",
    username: ""
  });

  const [secondStep, setSecondStep] = useState({
    Email: "",
    PhoneNumber: "",
    Password: "",
    ConfirmPassword: ""
  });

  const [step, setStep] = useState(1);
  
  const handleNextStep = () => setStep((prev) => prev + 1);
  const handleBackStep = () => setStep((prev) => prev - 1);
  const handleFinish = () => alert("Бүртгэл амжилттай дууслаа!");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-[416px]">
        {step === 1 && (
          <StepOne 
            userInformation={userInformation} 
            setUserInformation={setUserInformation} 
            handleNextStep={handleNextStep} 
          />
        )}
        {step === 2 && (
          <StepTwo 
            secondStep={secondStep} 
            setSecondStep={setSecondStep} 
            handleNextStep={handleNextStep} 
            handleBackStep={handleBackStep} 
          />
        )}
        {step === 3 && (
          <StepThree 
            handleNextStep={handleFinish} 
            handleBackStep={handleBackStep} 
          />
        )}
        {step === 4 && <StepFour />}
      </div>
    </main>
  );
}

// ==================== STEP COMPONENTS ====================

function StepOne({ userInformation, setUserInformation, handleNextStep }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let localErrors = {};
    const onlyLetters = /^[\p{L}\s'-]+$/u; // IMG_0410_2.jpg дээрх regex

    if (!userInformation.firstName.trim()) {
      localErrors.firstName = "Нэрээ оруулна уу";
    } else if (!onlyLetters.test(userInformation.firstName)) {
      localErrors.firstName = "Нэр зөвхөн үсгээр байх ёстой";
    }

    if (!userInformation.lastName.trim()) {
      localErrors.lastName = "Овогоо оруулна уу";
    }

    if (!userInformation.username.trim()) {
      localErrors.username = "Хэрэглэгчийн нэрээ оруулна уу";
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) handleNextStep();
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-sm w-full">
      <h2 className="text-xl font-bold mb-2">Хувийн мэдээлэл (1/3)</h2>
      <InputField 
        labelTitle="First name"
        hintText="Энд нэрээ бичнэ үү" 
        value={userInformation.firstName}
        errorMessage={errors.firstName}
        onTextChange={(e) => setUserInformation({ ...userInformation, firstName: e.target.value })}
      />
      <InputField 
        labelTitle="Last name"
        hintText="Энд овогоо бичнэ үү"
        value={userInformation.lastName}
        errorMessage={errors.lastName}
        onTextChange={(e) => setUserInformation({ ...userInformation, lastName: e.target.value })}
      />
      <InputField 
        labelTitle="Username"
        hintText="Хэрэглэгчийн нэр"
        value={userInformation.username}
        errorMessage={errors.username}
        onTextChange={(e) => setUserInformation({ ...userInformation, username: e.target.value })}
      />
      <button onClick={handleContinue} className="w-full h-[44px] bg-black text-white font-medium rounded-lg mt-4 hover:bg-gray-800 transition-colors">
        Continue &gt;
      </button>
    </div>
  );
}

function StepTwo({ secondStep, setSecondStep, handleNextStep, handleBackStep }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let localErrors = {};
    if (!secondStep.Email.trim()) localErrors.Email = "Имэйл хаяг шаардлагатай";
    if (!secondStep.PhoneNumber.trim()) localErrors.PhoneNumber = "Утасны дугаар шаардлагатай";
    if (!secondStep.Password) localErrors.Password = "Нууц үг оруулна уу";
    if (secondStep.Password !== secondStep.ConfirmPassword) {
      localErrors.ConfirmPassword = "Нууц үг зөрүүтэй байна";
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) handleNextStep();
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-sm w-full">
      <h2 className="text-xl font-bold mb-2">Холбоо барих (2/3)</h2>
      <InputField 
        labelTitle="Email"
        hintText="Placeholder" 
        value={secondStep.Email}
        errorMessage={errors.Email}
        onTextChange={(e) => setSecondStep({ ...secondStep, Email: e.target.value })}
      />
      <InputField 
        labelTitle="Phone number"
        hintText="Placeholder"
        value={secondStep.PhoneNumber}
        errorMessage={errors.PhoneNumber}
        onTextChange={(e) => setSecondStep({ ...secondStep, PhoneNumber: e.target.value })}
      />
      <InputField 
        labelTitle="Password"
        hintText="Placeholder"
        value={secondStep.Password}
        errorMessage={errors.Password}
        onTextChange={(e) => setSecondStep({ ...secondStep, Password: e.target.value })}
      />
      <InputField 
        labelTitle="Confirm password"
        hintText="Placeholder"
        value={secondStep.ConfirmPassword}
        errorMessage={errors.ConfirmPassword}
        onTextChange={(e) => setSecondStep({ ...secondStep, ConfirmPassword: e.target.value })}
      />
      <div className="flex gap-2 mt-4">
        <button onClick={handleBackStep} className="w-1/3 h-[44px] border border-gray-300 text-black font-medium rounded-lg hover:bg-gray-100 transition-colors">
          Back
        </button>
        <button onClick={handleContinue} className="w-2/3 h-[44px] bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
          Continue &gt;
        </button>
      </div>
    </div>
  );
}

function StepThree({ handleNextStep, handleBackStep }) {
  return (
    <div className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-sm w-full text-center">
      <h2 className="text-xl font-bold">Баталгаажуулалт (3/3)</h2>
      <p className="text-gray-600 my-4">Мэдээллээ бүрэн оруулж дууссан бол илгээнэ үү.</p>
      <div className="flex gap-2">
        <button onClick={handleBackStep} className="w-1/3 h-[44px] border border-gray-300 text-black font-medium rounded-lg hover:bg-gray-100 transition-colors">
          Back
        </button>
        <button onClick={handleNextStep} className="w-2/3 h-[44px] bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
          Finish
        </button>
      </div>
    </div>
  );
}

function StepFour() {
  return (
    <div className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-sm w-full text-center">
      <h2 className="text-xl font-bold text-green-600">Амжилттай!</h2>
      <p className="text-gray-600">Таны бүртгэл бүрэн хийгдлээ.</p>
    </div>
  );
}