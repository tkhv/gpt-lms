import Link from "next/link";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link className="flex bg-gray-600 h-8 w-12" href="/dashboard">
        Login
      </Link>
    </div>
  );
}
