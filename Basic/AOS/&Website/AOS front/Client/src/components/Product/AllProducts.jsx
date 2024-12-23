import { FilterProduct } from "./FilterProduct";
import homeImage from "../../assets/icon/HomeImage1.png";
import CardShop from "./CardShop";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchProducts } from "../../Redux/apiCalls/productApiCalls";
import { Link } from "react-router-dom";
import { IoWarning } from "react-icons/io5";

function AllProducts() {
  const location = useLocation();
  const { search } = useParams();
  const title = location.state ? location.state.title : search;
  const [products, setProducts] = useState([]);
  const searchProductsFunc = async (search) => {
    const data = await searchProducts(search);
    console.log(data);
    setProducts(data);
  };
  //   useEffect(() => {
  //   searchProducts(search);
  //   }, []);

  const searchResult = location.search;
  useEffect(() => {
    searchProductsFunc(search);
  }, [searchResult]);
  const des =
    " Born to push the very limits of ultra-lightweight gaming, the Razer Viper Mini takes up a smaller form that remains just as big in performance. Shortening its length and grip width";
  return (
    <div className="h-fit flex pt-32  ">
      <div className=" max-md:hidden w-1/4 h-screen  ">
        <FilterProduct />
      </div>

      <div className="w-3/4  h-fit   mx-10">
        <div className=" text-3xl max-md:text-2xl font-bold">{title}</div>
        <div className=" md:grid-cols-3 grid xl:grid-cols-2 max-md:grid-cols-2    mt-10 ">
          {products?.map((product) => (
            <Link to={`/Products/${product._id}`} key={product._id}>
              <CardShop
                image={homeImage}
                title={product.Title}
                price={product.Price}
                rate={product.Product_RatingAverage}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
