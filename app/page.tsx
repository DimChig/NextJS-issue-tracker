import Pagination from "./components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const searchParamsObject = await searchParams;
  return (
    <Pagination
      itemCount={100}
      pageSize={10}
      currentPage={parseInt(searchParamsObject.page)}
    />
  );
}
