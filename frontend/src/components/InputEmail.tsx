import { Input } from "@chakra-ui/react";
import "./input.css";
export function InputEmail() {
  return (
    <>
      <div className="input-container">
        <div className="input">
          <label htmlFor="email" className="block text-sm/6 font-medium ">
            E-MAIL
          </label>
          <Input
            type="email"
            placeholder=" Digite seu e-mail"
            bg="#10284bc"
            border="1px solid #10284b"
            borderRadius="8px"
            height="48px"
            padding="0 12px"
          />
        </div>

        <div className="input">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-100"
          >
            <span style={{ color: "#046AEE" }}>SENHA</span>
          </label>
          <Input
            type="password"
            placeholder=" Digite sua senha"
            bg="#10284bc"
            border="1px solid #10284b"
            borderRadius="8px"
            height="48px"
            padding="0 12px"
          />
          <a
            href="#"
            className=" font-semibold text-indigo-400 hover:text-indigo-300"
          >
            <span style={{ color: "#046AEE" }}>Esqueceu sua senha?</span>
          </a>
        </div>
      </div>
    </>
  );
}
