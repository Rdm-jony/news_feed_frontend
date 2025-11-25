import Events from "./Events";
import Explore from "./Explore";
import SuggestedPeople from "./Suggested";

const LeftSidebar = () => {
    return (
        <div className="space-y-5">
            <Explore />
            <SuggestedPeople />
            <Events />
        </div>
    );
};

export default LeftSidebar;