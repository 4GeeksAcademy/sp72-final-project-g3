import react from "react";


export const CommentSubmit = () => {
    return (
        <div>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Comment Title</label>
                <input type="title" className="form-control" id="titleinput" placeholder="Review Title"/>
            </div>
            <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">Comment Body</label>
                <textarea className="form-control" id="commentBody" rows="3"></textarea>
            </div>
        </div>
    );
};