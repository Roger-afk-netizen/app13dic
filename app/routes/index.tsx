import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return redirect("/pokemon");
};

export default function Index() {
  return <div>Redirecting...</div>;
}
