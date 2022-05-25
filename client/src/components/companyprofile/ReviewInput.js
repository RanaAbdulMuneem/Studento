import { useState } from "react";

const ReviewInput = () => {
  const [liked, setLiked] = useState(false)


  return (



    <div className="mt-3">
      <div class="btn-group" role="group" aria-label="Basic example">
        
        {
          liked ? (
            <button type="button" class="btn btn-secondary" onClick={() => setLiked(!liked)}>
              Liked
            </button>
          ) : (
            <button type="button" class="btn btn-secondary" onClick={() => setLiked(!liked)}>
              Like
            </button>
          )
        }
      
        <input type="text" placeHolder="Comment" class="form-control w-100"/>
      </div>
    </div>
  );
};

export default ReviewInput;
