import filters from "../assets/filters.svg";
import trash from "../assets/trash.svg";
import arrow from "../assets/arrow.svg";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import Filter from "../components/Filter";
import Loader from "../components/Loader";
import { getAllTags } from "../components/apolloClient/Queries";

export default function Sidebar({
  setFilters,
  tagsCount,
}: {
  setFilters: Dispatch<SetStateAction<string[]>>;
  tagsCount: { [index: string]: number };
}) {
  const initialState = {
    props: {
      rotate90: true,
    },
  };
  const [state, dispatch] = useReducer(
    (prev: any, next: any) => ({ ...prev, ...next }),
    initialState
  );

  const [tags, setTags] = useState<{ name: string; id: number }[]>([]);
  useEffect(() => {
    getAllTags().then((result) => {
      result.forEach((tag: { id: number; name: string }) =>
        dispatch({ [tag.name]: false })
      );
      setTags(result);
    });
  }, []);
  useEffect(() => {
    const selectedFilters = Object.keys(state).map((key, index) =>
      key !== "props" ? (Object.values(state)[index] === true ? key : "") : ""
    );
    setFilters(selectedFilters.filter((item) => item !== ""));
  }, [state]);
  return (
      <form className={`${
      state.props.rotate90 ? "" : "pr-4"
        } p-2 w-60 h-screen fixed bg-white -mt-3 overflow-scroll`}>
      <h2 className="flex items-center justify-center mb-4">
        <img src={filters} alt="" className="!w-4 mr-4" />
        Filtres
      </h2>
      <div className="hover:bg-primary-hover hover:rounded py-1 ">
        <label htmlFor="reset" className="flex items-center cursor-pointer">
          <img src={trash} alt="" className="!w-4 mr-4" />
          Effacer les filtres
        </label>
        <input
          type="reset"
          name="reset"
          id="reset"
          hidden
          onClick={() => tags.map((tag) => dispatch({ [tag.name]: false }))}
        />
      </div>
      <div className="mt-4">
        <span
          className="flex items-center justify-between cursor-pointer"
          onClick={() =>
            dispatch({ props: { rotate90: !state.props.rotate90 } })
          }
        >
          Spécialités
          <img
            src={arrow}
            alt=""
            className={`w-2 transition ${
              state.props.rotate90 ? "-rotate-90" : ""
            }`}
          />
        </span>
        <div
          className={`${
            state.props.rotate90 ? "h-0" : "h-auto"
          } transition overflow-hidden`}
        >
          {tagsCount ? (
            Object.keys(tagsCount).map((tag, index) => (
              <Filter
                rotate={state.props.rotate90}
                info={{
                  id: tags[index].id,
                  name: tag,
                  count: Object.values(tagsCount)[index],
                }}
                state={state}
                dispatch={dispatch}
                key={tag}
              />
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <div className="mt-4">
        <span
          className="flex items-center justify-between cursor-pointer"
          onClick={() =>
            dispatch({ props: { rotate90: !state.props.rotate90 } })
          }
        >
          Zone de 
          <img
            src={arrow}
            alt=""
            className={`w-2 transition ${
              state.props.rotate90 ? "-rotate-90" : ""
            }`}
          />
        </span>
        <div
          className={`${
            state.props.rotate90 ? "h-0" : "h-auto"
          } transition overflow-hidden`}
        >
          {tagsCount ? (
            Object.keys(tagsCount).map((tag, index) => (
              <Filter
                rotate={state.props.rotate90}
                info={{
                  id: tags[index].id,
                  name: tag,
                  count: Object.values(tagsCount)[index],
                }}
                state={state}
                dispatch={dispatch}
                key={tag}
              />
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </form>
  );
}
