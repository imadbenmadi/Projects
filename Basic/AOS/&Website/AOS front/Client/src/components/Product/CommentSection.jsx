import React from "react";
import faker from "faker"; // Importing Faker library for dummy data generation
import Review from "./Review"; // Importing the Review component

function CommentSection({ product, singlComment, user }) {
  return (
    <div className="section  max-h-[70vh]">
      {product.Comments?.map((comment) => (
        <div key={comment._id}>
          {product.Ratings?.filter(
            (rating) => rating.user === comment.user
          ).map((rating) => (
            <Review
              user={rating.user}
              key={rating._id}
              img={faker.image.avatar()}
              rating={rating.rate}
              comment={comment.Comment}
            />
          ))}
        </div>
      ))}
      {/* {singlComment.comment != "" && (
        <Review
          user={user}
          img={faker.image?.avatar() || ""}
          rating={singlComment?.rate || 0}
          comment={singlComment?.comment || ""}
        />
      )} */}
    </div>
  );
}

export default CommentSection;
