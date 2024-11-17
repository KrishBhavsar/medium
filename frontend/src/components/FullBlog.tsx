import { Blog } from "../hooks";
import AppBar from "./AppBar";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: Blog }) => {
  const getCurrentDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    // @ts-ignore
    return new Date().toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <div>
        <AppBar />
      </div>
      <div className="grid grid-cols-6 px-10 pt-10">
        <div className="col-span-4">
          <div className="text-4xl font-extrabold">{blog.title}</div>
          <div className="text-slate-500 py-2">
            Posted on {getCurrentDate()}
          </div>
          <div className="text-2xl text-gray-500">{blog.content}</div>
        </div>
        <div className="col-span-2">
          <div>Author</div>
          <div className="flex mt-5">
            <div className="pt-2 mr-1">
              <Avatar nameInitials={blog.author.name} size={8} />
            </div>
            <div className="px-2">
              <div className="text-2xl font-bold">{blog.author.name}</div>
              <div className="text-lg max-w-sm text-slate-500 pt-2">
                Random catch phrase about the author's ability to grab user's
                attention
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
