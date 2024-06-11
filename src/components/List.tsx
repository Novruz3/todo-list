const List = () => {
  return (
    <div className="bg-white w-full py-4 px-8 items-center flex justify-between">
      <p>List1</p>
      <div className="gap-4 flex">
        <button className="py-2 px-4 rounded-sm bg-red-500">Delete</button>
        <button className="py-2 px-4 rounded-sm bg-blue-500">Edit</button>
      </div>
    </div>
  )
}

export default List