import { faker } from "@faker-js/faker";

function ContolCells() {
  const generateRandomData = () => {
    return {
      id: faker.string.uuid(),
      productName: faker.commerce.productName(),
      buyerName: faker.person.fullName(),
      date: faker.date.anytime(),
      email: faker.internet.email(),
    };
  };

  // Generate an array of random items
  const itemsArray = Array.from({ length: 20 }, () => generateRandomData());

  return (
    <body className=" mt-7 max-md:h-[90%]  mx-5 font-['Outfit'] max-md:m-0 max-md:mx-0 max-md:w-screen ">
      <div className="text-black text-3xl font-bold  leading-3 my-5 ">
        Your requests
      </div>
      <div className="container   scrollProduct overflow-y-scroll  pr-2 mt-7  font-['Outfit']  sm:shadow-lg h-[80vh] max-md:h-[80vh]    ">
        <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead className="text-black">
            {itemsArray.map((item) => (
              <tr
                key={item.id}
                className="bg-[#CBD5E1] flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
              >
                <th className="p-3 text-left max-md:max-h-10"> Product </th>
                <th className="p-3 text-left max-md:max-h-10">Buyer </th>
                <th className="p-3 text-left max-md:max-h-10  ">Date</th>
                <th className="p-3 max-md:max-h-10 text-left">Email</th>
                <th
                  className=" max-md:max-h-10 p-3 text-left flex "
                  width="110px"
                >
                  Actions
                </th>
              </tr>
            ))}
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {itemsArray.map((item) => (
              <tr
                key={item.id}
                className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
              >
                <td className="max-md:max-h-10 border-grey-light border hover:bg-gray-100 p-3">
                  {item.productName}
                </td>
                <td className=" max-md:max-h-10 border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {item.buyerName}
                </td>
                <td className=" max-md:max-h-10  border-grey-light border hover:bg-gray-100 p-3 truncate">
                  01/11/2002{" "}
                </td>
                <td className=" max-md:max-h-10  border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {item.email}
                </td>
                <td className="  max-md:max-h-10 border-grey-light border hover:bg-gray-100 max-h-10 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                  <button
                    type="button"
                    className=" text-white max-md:max-h-10 bg-green-700 hover:bg-green-800     font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 max-md:px-1 max-md:py-2 "
                  >
                    Accepte
                  </button>
                  <button
                    type="button"
                    className="focus:outline-none max-md:max-h-8 text-white bg-red-700 hover:bg-red-800  focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 max-md:px-1 max-md:py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delate
                  </button>
                  <button
                    type="button"
                    className="focus:outline-none max-md:max-h-8 text-white bg-blue-700 hover:bg-blue-800  focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 max-md:px-1 max-md:py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
                  >
                    View Detils
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </body>
  );
}

export default ContolCells;
