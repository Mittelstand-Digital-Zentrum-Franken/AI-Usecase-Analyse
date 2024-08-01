import React from "react";

const LoginCard = ({
  unionClassName,
  union = "union.svg",
  vector = "vector.svg",
  primaryButton = "primary-button-40px.png",
  otherPayMethod = "other-pay-method.svg",
}) => {
  return (
    <div className="flex flex-col w-[456px] h-[701px] items-start justify-around gap-[228px] p-[48px] relative bg-white-ffffff">
      <div className="flex flex-col items-start gap-[48px] relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex items-center justify-around gap-[61px] relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative w-[360px] h-[48px]">
            <div className="absolute h-[20px] top-[13px] left-[38px] [font-family:'Roboto-Medium',Helvetica] font-medium text-black text-[20px] text-center tracking-[0.30px] leading-[20px] whitespace-nowrap">
              MDZ Franken Usecase Analyse
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[24px] relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col items-start gap-[32px] relative self-stretch w-full flex-[0_0_auto] rounded-[8px]">
            <div className="flex flex-col items-start gap-[24px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative self-stretch mt-[-1.00px] font-title font-[number:var(--title-font-weight)] text-[#da3a33] text-[length:var(--title-font-size)] tracking-[var(--title-letter-spacing)] leading-[var(--title-line-height)] [font-style:var(--title-font-style)]">
                Login
              </div>
              <div className="flex flex-col items-start gap-[20px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-[16px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                    <div className="gap-[8px] flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex items-start px-[16px] py-0 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative flex-1 mt-[-1.00px] [font-family:'Arial-Regular',Helvetica] font-normal text-black-800-333333 text-[11px] tracking-[0.30px] leading-[12px]">
                          Login
                        </div>
                      </div>
                      <div className="relative self-stretch w-full h-[48px] bg-black-50-f2f2f2 rounded-[6px] border-[0.5px] border-solid border-black-100-e5e5e5">
                        <div className="flex w-[360px] items-center justify-between pl-[16px] pr-[8px] py-[8px] relative rounded-[6px]">
                          <div className="inline-flex flex-col items-start justify-center relative flex-[0_0_auto]">
                            <div className="inline-flex items-center gap-px relative flex-[0_0_auto]">
                              <div className="relative w-fit mt-[-1.00px] font-placeholder-value font-[number:var(--placeholder-value-font-weight)] text-black-500-808080 text-[length:var(--placeholder-value-font-size)] tracking-[var(--placeholder-value-letter-spacing)] leading-[var(--placeholder-value-line-height)] whitespace-nowrap [font-style:var(--placeholder-value-font-style)]">
                                Email or phone number
                              </div>
                            </div>
                          </div>
                          <div className="opacity-0 inline-flex items-start gap-[16px] p-[8px] relative flex-[0_0_auto]">
                            <div className="relative w-[16px] h-[16px]">
                              <div className="inline-flex items-start gap-[10px] p-[5px] relative bg-black-700-4d4d4d rounded-[8px]">
                                <img
                                  className={`relative w-[6px] h-[6px] mb-[-3523.75px] mr-[-786.00px] ${unionClassName}`}
                                  alt="Union"
                                  src={union}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                    <div className="gap-[8px] flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex items-start px-[16px] py-0 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative flex-1 mt-[-1.00px] [font-family:'Arial-Regular',Helvetica] font-normal text-black-800-333333 text-[11px] tracking-[0.30px] leading-[12px]">
                          Password
                        </div>
                      </div>
                      <div className="relative self-stretch w-full h-[48px] bg-black-50-f2f2f2 rounded-[6px] border-[0.5px] border-solid border-black-100-e5e5e5">
                        <div className="flex w-[360px] items-center justify-between pl-[16px] pr-[8px] py-[8px] relative rounded-[6px]">
                          <div className="inline-flex flex-col items-start justify-center relative flex-[0_0_auto]">
                            <div className="inline-flex items-center gap-px relative flex-[0_0_auto]">
                              <div className="relative w-fit mt-[-1.00px] font-placeholder-value font-[number:var(--placeholder-value-font-weight)] text-black-500-808080 text-[length:var(--placeholder-value-font-size)] tracking-[var(--placeholder-value-letter-spacing)] leading-[var(--placeholder-value-line-height)] whitespace-nowrap [font-style:var(--placeholder-value-font-style)]">
                                Enter password
                              </div>
                            </div>
                          </div>
                          <div className="inline-flex items-start gap-[16px] p-[8px] relative flex-[0_0_auto]">
                            <div className="relative w-[16px] h-[16px]">
                              <img className="absolute w-[16px] h-[11px] top-[3px] left-0" alt="Vector" src={vector} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-[16px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex items-center gap-[8px] relative flex-1 grow">
                    <div className="relative w-[40px] h-[20px] bg-black-50-f2f2f2 rounded-[36.5px] overflow-hidden border-[0.5px] border-solid border-black-100-e5e5e5">
                      <div className="w-[20px] h-[20px]">
                        <div className="relative w-[16px] h-[16px] top-[2px] left-[2px] bg-white-ffffff rounded-[12px] shadow-[1px_1px_2px_-1px_#3333334c]" />
                      </div>
                    </div>
                    <div className="flex-1 text-black-900-1a1a1a relative mt-[-1.00px] [font-family:'Arial-Regular',Helvetica] font-normal text-[12px] tracking-[0.30px] leading-[20px]">
                      Remember me
                    </div>
                  </div>
                  <div className="flex-1 text-[#0d859a] text-right relative mt-[-1.00px] [font-family:'Arial-Regular',Helvetica] font-normal text-[12px] tracking-[0.30px] leading-[20px]">
                    Forgot password?
                  </div>
                </div>
              </div>
            </div>
            <img className="relative self-stretch w-full flex-[0_0_auto]" alt="Primary button" src={primaryButton} />
            <div className="relative self-stretch w-full h-px bg-black-100-e5e5e5" />
            <div className="flex items-start gap-[8px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-center justify-center px-[16px] py-[10px] relative flex-1 grow bg-black-800-333333 rounded-[6px]">
                <div className="inline-flex items-center justify-end gap-[8px] relative flex-[0_0_auto]">
                  <img className="relative w-[20px] h-[20px]" alt="Other pay method" src={otherPayMethod} />
                  <p className="relative w-fit mt-[-1.00px] [font-family:'Arial-Regular',Helvetica] font-normal text-white-ffffff text-[12px] text-center tracking-[0.30px] leading-[20px] whitespace-nowrap">
                    Or sign in with Google
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex items-start gap-[8px] relative flex-[0_0_auto]">
            <div className="w-fit text-black-900-1a1a1a whitespace-nowrap relative mt-[-1.00px] [font-family:'Arial-Regular',Helvetica] font-normal text-[12px] tracking-[0.30px] leading-[20px]">
              Dont have an account?
            </div>
            <div className="w-fit text-[#0d859a] text-right whitespace-nowrap relative mt-[-1.00px] [font-family:'Arial-Regular',Helvetica] font-normal text-[12px] tracking-[0.30px] leading-[20px]">
              Sign up now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default LoginCard;