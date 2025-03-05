async function ListIdPage({ params }: { params: Promise<{ listId: string }> }) {
  const { listId } = await params;

  console.log(listId);

  return <div>어서오게나.. 상세페이지일세</div>;
}

export default ListIdPage;
