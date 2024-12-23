import CategoryCard from "./CategoryCard";
import {
    Bs0Circle,
    BsBook,
    BsCamera,
    BsCashCoin,
    BsCode,
    BsGraphUp,
    BsHeart,
    BsMegaphone,
    BsPerson,
} from "react-icons/bs";

const Categories = () => {
    return (
        <section className="w-full bg-[#F0F8F7] p-5">
            <div className="md:max-w-[1100px] m-auto max-w-[400px]">
                <h1 className="md:leading-[72px] text-3x1 font-bold">
                    Our{" "}
                    <span className="text-[#208486]">Popular Categories</span>
                </h1>
                <p className="text-lg text-gray-600">
                    Various versions have evolved over the years
                </p>
                <div className="grid md:grid-cols-3 py-12 gap-4">
                    <CategoryCard
                        icon={<BsBook size={30} />}
                        title="Literature & Composition"
                    />
                    <CategoryCard
                        icon={<BsCode size={30} />}
                        title="Computer Science"
                    />
                    <CategoryCard
                        icon={<BsMegaphone size={30} />}
                        title="Communications"
                    />
                    <CategoryCard
                        icon={<BsGraphUp size={30} />}
                        title="Business Administration"
                    />
                    <CategoryCard
                        icon={<BsPerson size={30} />}
                        title="Psychology"
                    />
                    <CategoryCard
                        icon={<BsCamera size={30} />}
                        title="Visual Arts"
                    />
                    <CategoryCard
                        icon={<BsCashCoin size={30} />}
                        title="Economics"
                    />
                    <CategoryCard
                        icon={<BsHeart size={30} />}
                        title="Health Sciences"
                    />
                    <CategoryCard
                        icon={<Bs0Circle size={30} />}
                        title="other course"
                    />
                </div>
            </div>
        </section>
    );
};

export default Categories;
