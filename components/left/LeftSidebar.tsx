import Events from "./Events";
import Explore from "./Explore";
import SuggestedPeople from "./Suggested";

const LeftSidebar = () => {
    return (
        <div>
            <Explore />
            <SuggestedPeople />
            <Events />
        </div>
    );
};

export default LeftSidebar;