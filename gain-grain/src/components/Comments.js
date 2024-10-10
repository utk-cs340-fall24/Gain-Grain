// Comments.js
export default function Comments({ visibleComments }) {
    return (
        <div className="comments-container flex flex-col ml-4">
            {Object.keys(visibleComments).map((postId) =>
                visibleComments[postId] ? (
                    <div key={postId} className="comments-section bg-white p-3 rounded-lg mt-3 w-64">
                        <h4 className="font-bold">Comments</h4>
                        <div className="comment mb-2"><strong>@user456:</strong> Great post!</div>
                        <div className="comment"><strong>@fitguru:</strong> Really informative!</div>
                    </div>
                ) : null
            )}
        </div>
    );
}
