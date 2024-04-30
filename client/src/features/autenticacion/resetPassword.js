import React, { useState, useEffect } from "react";
import "./resetPassword.css";
import { useFindEmailMutation } from "./authSlice";

import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  // ------------------------------Buscar email------------------------------
  const [emailText, setEmailText] = useState("");
  const [supportingText, setSupportingText] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isButtonEmailEnabled, setIsButtonEmailEnabled] = useState(true);

  const [
    findEmail,
    { data: response, isLoading, isSuccess, isError, error: errorsito },
  ] = useFindEmailMutation();

  const handleEmailChange = (e) => {
    setSupportingText("");
    setEmailText(e.target.value);
    setIsButtonEmailEnabled(true);
  };

  const handleSubmitEmailForm = (e) => {
    e.preventDefault();
    if (emailText.length === 0) {
      setSupportingText("El campo es obligatorio");
      return;
    }
    const formulario = new FormData();
    formulario.append("user_or_email", emailText);
    try {
      findEmail(formulario);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      setIsButtonEmailEnabled(false);
    }
    if (isSuccess) {
      setIsButtonEmailEnabled(true);
      goToNextStep();
    }
    if (isError) {
      setIsEmailValid(false);
      setSupportingText(errorsito.data.error);
    }
  }, [isError, isLoading, isSuccess, response]);

  const goToNextStep = () => setStep(step + 1);
  const goToPreviousStep = () => setStep(step - 1);

  // useEffect(() => {
  //   if (step === 2) {
  //     setTimeout(() => {
  //       navigate("/")
  //     }, 5000);
  //   }
  // }, [step]);

  return (
    <div className="page principal">
      {step === 1 && (
        <div className="step-1">
          <h1>Restablecer contraseña</h1>
          <div className="para-form">
            <p>Ingresa tu correo electrónico para buscar tu cuenta.</p>
            {/* <h3>Ingresa tu correo electrónico para buscar tu cuenta</h3> */}
            <input
              type="email"
              name="user_email"
              value={emailText}
              onChange={handleEmailChange}
              placeholder="Correo electrónico"
              required
            />
            {supportingText.length > 0 && (
              <p style={{ color: "red" }}>{supportingText}</p>
            )}
            <div className="botones">
              <a href="/login">
                <button className="b-cancelar btn btn-outline-primary">Cancelar</button>
              </a>
              <button
                type="submit"
                onClick={handleSubmitEmailForm}
                disabled={!isButtonEmailEnabled}
                className="b-buscar btn btn-azul"
              >
                {isEmailValid ? <p>Continuar</p> : <p>Buscar cuenta</p>}
              </button>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="step-2 step-1">
          <h1>Revisa tu bandeja de entrada</h1>
          <p>
            Se ha enviado un correo electrónico con un enlace para restablecer
            la contraseña
          </p>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
