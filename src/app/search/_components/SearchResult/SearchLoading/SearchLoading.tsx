import LoadingSpinner from "@/components/common/LoadingSpinner";

interface SearchResultProps {
  isLoading: boolean;
}

function SearchLoading({ isLoading }: SearchResultProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <LoadingSpinner isLoading={isLoading} size={40} />
    </div>
  );
}

export default SearchLoading;
