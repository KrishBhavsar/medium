import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={`/blogs`}>
        <div className="flex items-center text-2xl font-semibold">Medium</div>
      </Link>

      <div className="flex">
        <div className="">
          <Link to={`/publish`}>
            <button
              type="button"
              className=" text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 text-center "
            >
              New
            </button>
          </Link>

          <Avatar nameInitials={"krish bhavsar"} size={8} />
        </div>
      </div>
    </div>
  );
};

export default AppBar;
