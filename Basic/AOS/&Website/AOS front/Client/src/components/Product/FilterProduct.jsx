export function FilterProduct() {
  return (
    <div className="flex max-mad:absolute top-0 left-0 flex-col py-12 pr-20 pl-8 mx-auto w-full text-xl text-black rounded-3xl bg-zinc-100 max-w-[480px]">
      <div className="self-start mt-5 text-4xl">Filters</div>

      <div className="mt-16 ">
        Price
        <ul>
          <li>
            <a className="underline">Under $25</a>
          </li>
          <li>
            <a className="underline" target="_blank">
              $25 to $50
            </a>
          </li>
          <li>
            <a className="underline" target="_blank">
              $50 to $100
            </a>
          </li>
          <li>
            <a className="underline" target="_blank">
              $100 to $200
            </a>
          </li>
          <li>
            <a className="underline" target="_blank">
              $200 & Above
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-16  ">
        Condition
        <ul>
          <li>
            <a className="underline" target="_blank">
              New
            </a>
          </li>
          <li>
            <a className="underline" target="_blank">
              Renewed
            </a>
          </li>
          <li>
            <a className="underline" target="_blank">
              Used
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
