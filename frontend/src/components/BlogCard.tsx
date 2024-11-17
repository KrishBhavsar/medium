import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface BlogCardInputs {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardInputs) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b-2 p-4 cursor-pointer">
        <div className="flex items-baseline">
          <div>
            <Avatar nameInitials={authorName} />
          </div>
          <div className="px-2 font-normal flex">
            {authorName}.{" "}
            <div className="font-thin text-slate-700 flex items-center px-2 ">
              <div className="h-1 w-1 rounded-full bg-slate-400 mr-1"></div>
              <div>{publishedDate}</div>
            </div>
          </div>
        </div>
        <div className="text-xl font-bold pt-1">{title}</div>
        <div className="text-md pt-1">{content.slice(0, 100) + "..."}</div>
        <div className="text-sm font-thin text-slate-600 pt-3">{`${Math.ceil(
          content.length / 100
        )} minutes`}</div>
      </div>
    </Link>
  );
};

export function Avatar({
  nameInitials,
  size = 8,
}: {
  nameInitials: string;
  size?: number;
}) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/signin");
  };

  return (
    <div className="relative inline-block">
      <div
        className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500 cursor-pointer`}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span className="text-gray-600 dark:text-gray-300">
          {nameInitials.trim()[0].toUpperCase()}
        </span>
      </div>

      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-gray-300 rounded-md shadow-lg z-10"
          onClick={() => setIsDropdownOpen(false)}
        >
          <ul className="py-1">
            <li
              className="block px-4 py-2 text-sm cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default BlogCard;
