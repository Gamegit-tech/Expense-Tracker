import Spinner from "./Spinner";

export default function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner size="lg" label="Loading page" />
    </div>
  );
}