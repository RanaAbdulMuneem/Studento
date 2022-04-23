const ReviewInput = () => {
  return (
    <div className="mt-3">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary">
          Upvote
        </button>
        <button type="button" class="btn btn-secondary">
          Downvote
        </button>
        <input type="text" placeHolder="Comment" class="form-control w-100"/>
      </div>
    </div>
  );
};

export default ReviewInput;
