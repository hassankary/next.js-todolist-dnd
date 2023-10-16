
const Cards = ({ firstName, lastName, gender, id, index }) => {
    return (
      <div className=" flex flex-col hover:scale-[102%] md:text-sm text-xs transition items-center px-1 py-1 bg-white dark:bg-slate-800 text-black dark:text-slate-200 rounded-xl shadow-xl">
        <div className="flex justify-center items-center h-[50px] w-full bg-gradient-to-r from-teal-500 to-purple-900 dark:from-slate-900 dark:to-slate-950 rounded-xl">
          <span className="text-white dark:text-slate-200">Photo Card</span>
        </div>
        <div className="flex flex-col justify-center items-center py-2">
          <h1>
            Name: {firstName} {lastName}
          </h1>
          <h1>
            Gender: {gender}
          </h1>
        </div>
        <div className="flex space-x-1">
          <button
            id={id}
            onClick={(e) => detailCard(e)}
            index={index}
            className="flex justify-center items-center p-2 text-white bg-gradient-to-r from-teal-500 to-purple-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-200 rounded-xl"
          >
            Detail
          </button>
          <button
            id={id}
            onClick={(e) => deleteCard(e)}
            index={index}
            className="flex justify-center items-center p-2 text-white bg-gradient-to-r from-red-500 to-yellow-500 dark:from-slate-900 dark:to-red-950 dark:text-slate-200 rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  export default Cards;