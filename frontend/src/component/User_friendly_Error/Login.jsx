import { useNavigate, useOutletContext } from "react-router-dom";
import { MdLock } from "react-icons/md";
import { useEffect } from "react";

export default function Login() {
  const { setSidebarToggle } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    setSidebarToggle((prev) => ({ ...prev, type: "type2", status: false }));
  }, [setSidebarToggle]);
  return (
    <section className="w-full p-4 flex justify-center">
      <article className="max-w-full flex-wrap text-center sm:flex-nowrap flex justify-center gap-6 rounded-xl py-5 px-6 bg-border border border-border">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl sm:text-3xl text-text font-extrabold">
              Try Login to get Started
            </h1>
            <p className="text-medium sm:text-xl font-semibold text-txlight">
              login will make you authorized, and it will easy to feed you post
              and handle interactions.
            </p>
          </div>
          <div className="flex justify-center gap-2">
            <button
              className="py-2 px-4 rounded-full uppercase text-text bg-red-500 icon font-medium"
              onClick={() => navigate("/login", { replace: true })}
            >
              login
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}
