import { useEffect, useState } from "react";
import PageTitle from "../../Components/Page_Title";

function SM() {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState(0);
  const [inputType, setInputType] = useState("ثنائي");
  const [outputType, setOutputType] = useState("عشري");
  const [isNumValid, setIsNumValid] = useState(true);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const regexBinary = /^[01\b]+$/;
    const regexHex = /^[0-9A-F\b]+$/;
    const regexOctal = /^[0-7\b]+$/;
    const regexDecimal = /^[0-9\b]+$/;

    let isValidInput = true;

    switch (inputType) {
      case "ثنائي":
        isValidInput = regexBinary.test(value);
        break;
      case "السادس عشري":
        isValidInput = regexHex.test(value.toUpperCase());
        break;
      case "ثماني":
        isValidInput = regexOctal.test(value);
        break;
      case "عشري":
        isValidInput = regexDecimal.test(value);
        break;
      default:
    }

    if (value === "" || isValidInput) {
      setIsNumValid(true);
      setInputValue(value);
    } else {
      setIsNumValid(false);
    }
  };
  const handleConversion = () => {
    if (inputValue === "") {
      setOutputValue("");
      return;
    }

    try {
      let inputValueParsed;
      if (getInputBase() === 16) {
        inputValueParsed = parseInt("0x" + inputValue, 16);
      } else {
        inputValueParsed = parseInt(inputValue, getInputBase());
      }

      let result;
      switch (outputType) {
        case "ثنائي": // Binary
          result = inputValueParsed.toString(2);
          break;
        case "السادس عشري": // Hexadecimal
          result = inputValueParsed.toString(16).toUpperCase();
          break;
        case "ثماني": // Octal
          result = inputValueParsed.toString(8);
          break;
        case "عشري": // Decimal
          result = inputValueParsed.toString(10);
          break;
        default:
          console.error("Invalid output type:", outputType);
          setOutputValue("");
      }

      setOutputValue(result);
    } catch (error) {
      console.error("Conversion error:", error.message);
      setOutputValue("");
    }
  };

  const getInputBase = () => {
    switch (inputType) {
      case "ثنائي":
        return 2;
      case "السادس عشري":
        return 16;
      case "ثماني":
        return 8;
      case "عشري":
        return 10;
      default:
        return 10; // Default base for other input types
    }
  };

  const [outputTypeOptions, setOutputTypeOptions] = useState([
    "ثنائي",
    "السادس عشري",
    "ثماني",
    "عشري",
  ]);

  useEffect(() => {
    setOutputTypeOptions(
      ["ثنائي", "السادس عشري", "ثماني", "عشري"].filter(
        (type) => type !== inputType
      )
    );
  }, [inputType]);

  const handleRemoveResult = () => {
    setOutputValue("0");
    setInputValue("");
  };

  return (
    <div dir="rtl">
      <PageTitle title="Systeme Machine" />
      <div className="flex flex-col items-center justify-center">
        <div className="text-center text-xl max-md:flex-col my-5 flex gap-5">
          <div>
            <div className="my-1">تحويل من </div>
            <select
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
              className="border border-gray-500 rounded-md px-2 py-1 mr-2"
            >
              <option value="ثنائي">ثنائي</option>
              <option value="السادس عشري">السادس عشري</option>
              <option value="ثماني">ثماني</option>
              <option value="عشري">العشري</option>
            </select>
          </div>
          <div>
            <div className="my-1">التحويل الى </div>
            <select
              value={outputType}
              onChange={(e) => setOutputType(e.target.value)}
              className="border border-gray-500 rounded-md px-2 py-1"
            >
              {outputTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="border border-gray-500 rounded-md px-2 py-1 mb-2"
          placeholder="ادخل الرقم هنا"
        />
        {!isNumValid && <div className="text-red-500 font-bold"> غير صالح</div>}
        <div className="my-5 text-2xl text-center font-bold">
          النتيجة
          <div className="min-w-[80%] h-fit min-h-10 px-5 bg-slate-200">
            {outputValue}
          </div>
        </div>
        <div className="flex max-md:w-[80%] max-md:flex-col gap-2">
          <button
            disabled={inputValue === ""}
            onClick={handleConversion}
            className="bg-blue-500 max-md:w-full text-white px-4 py-2 rounded-md"
          >
            تحويل
          </button>
          <button
            onClick={handleRemoveResult}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}

export default SM;
