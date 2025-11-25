import Friends from "./Friends";
import YouMightLike from "./YouMightLike";

const RightSidebar = () => {
    return (
        <div className="space-y-5">
            <YouMightLike />
            <Friends />
        </div>
    );
};

export default RightSidebar;