import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-124px)] container mx-auto flex justify-center items-center">
      <div>
        <h1 className="text-5xl font-bold text-center">404</h1>
        <p className="text-center text-lg">Page Not Found</p>
        <Link
          to="/"
          className="block text-center mt-4 bg-primary text-white px-2.5 py-2 rounded-md hover:opacity-85 "
        >
          Go back to Home
        </Link>
      </div>
    </main>
  );
}
