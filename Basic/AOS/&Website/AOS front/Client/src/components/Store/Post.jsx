import React, { useEffect } from "react";
function Post({ item }) {
  
  return (
    <div
      key={item.id}
      className="flex cursor-pointer flex-col w-30 max-md:ml-0 max-md:w-full  "
    >
      <div className="flex flex-col  max-md:ml-0 max-md:w-full h-full">
        <div className="flex flex-col grow pb-3.5 w-full text-xs text-black overflow-hidden rounded-2xl bg-zinc-300 max-md:mt-5">
          <img
            loading="lazy"
            src={item.image}
            className="w-full aspect-[2.27]"
          />
          <div className="flex flex-col  pr-1.5 pl-3.5 mt-9">
            <div className="h-12 min-h-20">{item.description}</div>
            <div className="flex gap-5 justify-between  bottom-0 pr-3 mt-6 w-full whitespace-nowrap">
              <div className="flex gap-1.5 justify-between">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d87c44bc7c79f4c9408c7c0f5db3afe5c371a3166c517da34640f6819b54dfa?"
                  className="aspect-square w-[18px]"
                />
                <div className="my-auto">{item.rate}</div>
              </div>
              <div className="flex gap-1.5 my-auto">
                <div>{item.numberLikes}</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e3a41d673596bcdd4e1d1eba67f65ef04a95a669d24fe05e67e68e4e738f8df?"
                  className="aspect-[1.1] fill-black w-[11px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
