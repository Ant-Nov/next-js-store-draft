import LoadingProduct from "./LoadingProduct"

const LoadingContainer = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
      <LoadingProduct/>
      <LoadingProduct/>
      <LoadingProduct/>
    </div>
  )
}
export default LoadingContainer