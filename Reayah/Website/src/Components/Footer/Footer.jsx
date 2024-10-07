import { TbArrowForward } from "react-icons/tb";
import logo from "../../../public/Footer/logoFooter.png";
import map from "../../../public/Footer/map.png";
import youtube from "../../../public/Footer/youtube.svg";
import facebook from "../../../public/Footer/facebook-01.svg";
import twitter from "../../../public/Footer/new-twitter-rectangle.svg";
import instagram from "../../../public/Footer/instagram.svg";
import linkedin from "../../../public/Footer/linkedin-01.svg";
export const Footer = () => {
  return (
    <div className="flex flex-col items-center self-stretch px-20 py-5 bg-white max-md:px-5">
      <img
        loading="lazy"
        src={logo}
        className="self-start ml-20 max-w-full aspect-[2.86] w-[265px] max-md:ml-2.5"
      />

      <div className="flex-wrap content-start w-full max-w-[1120px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-center py-1 text-lg text-neutral-500 max-md:mt-5">
              <div>
                The largest Algerian medical platform for providing reliable
                medical content، With the pens of thousands of accredited
                doctors…
              </div>
              <img
                loading="lazy"
                srcSet={map}
                className="mt-4 w-full aspect-[1.85]"
              />
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow pt-2.5 text-lg tracking-tight leading-7 text-neutral-500 max-md:mt-5">
              <div className="text-2xl font-semibold tracking-tight text-black">
                Reayah Policies
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-8 rounded-xl">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>Doctor agreement</div>
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-1.5 rounded-xl max-md:px-5">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>terms of use</div>
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-1.5 rounded-xl">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>Article publishing policy</div>
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-1.5 rounded-xl">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>Questions and answers policy</div>
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-1.5 rounded-xl max-md:px-5">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>privacy policy</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow pt-2.5 text-lg tracking-tight leading-7 text-neutral-500 max-md:mt-5">
              <div className="text-2xl font-semibold tracking-tight text-black">
                Reayah Departments
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-8 rounded-xl">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>Doctor agreement</div>
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-1.5 rounded-xl max-md:px-5">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>terms of use</div>
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-1.5 rounded-xl">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>Article publishing policy</div>
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-1.5 rounded-xl">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>Questions and answers policy</div>
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-1.5 rounded-xl max-md:px-5">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>privacy policy</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow pt-2.5 text-lg tracking-tight leading-7 text-neutral-500 max-md:mt-5">
              <div className="text-2xl font-semibold tracking-tight text-black">
                Reayah Links
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-8 whitespace-nowrap rounded-xl">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>Home</div>
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-1.5 rounded-xl max-md:px-5">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>About us</div>
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-1.5 whitespace-nowrap rounded-xl">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>FAQ</div>
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-1.5 whitespace-nowrap rounded-xl">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>Support</div>
              </div>
              <div className="flex gap-1.5 px-3.5 py-1.5 mt-1.5 rounded-xl max-md:px-5">
                <TbArrowForward className="w-6 h-6 my-auto" />
                <div>Prices and Plans</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-wrap justify-between content-between w-full max-w-[1120px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[41%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center pt-2 max-md:mt-10">
              <div className="text-2xl font-semibold text-black">
                Newsletter
              </div>
              <div className="mt-7 text-lg text-neutral-500 max-md:mr-2.5">
                Join our mailing list and get the latest offers, latest articles
                and medical news
              </div>
              <div className="flex gap-5  pl-5 overflow-hidden mt-6 text-sm font-light whitespace-nowrap bg-white rounded-xl border border-purple-500 border-solid max-md:pl-5">
                <input
                  className="flex-auto my-auto text-neutral-600"
                  placeholder=" example@mail.com"
                />

                <div className="justify-center px-7 py-5 text-white  bg-purple-500">
                  subscribe
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[30%] max-md:ml-0 max-md:w-full"></div>
          <div className="flex flex-col ml-5 w-[29%] max-md:ml-0 max-md:w-full"></div>
        </div>
      </div>
      <div className="flex-wrap justify-between content-between py-10 w-full max-w-[1120px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[54%] max-md:ml-0 max-md:w-full">
            <div className="text-lg font-light tracking-tight leading-7 text-neutral-500 max-md:mt-10 max-md:max-w-full">
              All medical information contained on the Al-Tibbi website aims to
              increase health awareness, and is not a substitute for consulting
              a specialist doctor
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[28%] max-md:ml-0 max-md:w-full">
            <div className="self-stretch my-auto text-lg tracking-tight leading-7 text-neutral-500 max-md:mt-10">
              © 2024 All Rights Reserved. By ReayahaMed
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[18%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col flex-wrap justify-end content-start self-stretch pl-3.5 my-auto max-md:mt-10">
              <div className="flex gap-2.5">
                <img
                  loading="lazy"
                  src={youtube}
                  className="shrink-0 w-6 aspect-square"
                />
                <img
                  loading="lazy"
                  src={facebook}
                  className="shrink-0 w-6 aspect-square"
                />
                <img
                  loading="lazy"
                  src={twitter}
                  className="shrink-0 w-6 aspect-square"
                />
                <img
                  loading="lazy"
                  src={instagram}
                  className="shrink-0 w-6 aspect-square"
                />
                <img
                  loading="lazy"
                  src={linkedin}
                  className="shrink-0 w-6 aspect-square"
                />
              </div>
              <div className="text-lg tracking-tight leading-7 text-neutral-500">
                +213 660 60 60 60
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
