import AddList from "./AddList"
import List from "./List"

const Lists = () => {
  return (
    <>
    <div className="flex flex-col justify-center p-8 flex-1">
            <AddList />
            <div className="flex flex-col justify-center items-center gap-4 mt-8">
              <List />
              <List />
            </div>
          </div>
    </>
  )
}

export default Lists