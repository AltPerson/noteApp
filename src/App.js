import React from "react";
import "./App.scss";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";
import { NotesContext } from "./data/Context";
import { db } from "./data/db/index";
import { useLiveQuery } from "dexie-react-hooks";
import { useState, useEffect } from "react";
import { initRecord } from "./utils/initRecord";

function App() {
  const notesList = useLiveQuery(() => db.notes?.toArray(), []);
  const [selected, setSelected] = useState({ is: false, id: null });
  const [edit, setEdit] = useState({ is: false, id: null });
  const [create, setCreate] = useState(false);
  const [areaText, setAreaText] = useState("");
  const [side, setSide] = useState(false);
  const [init, setInit] = useState(true);
  useEffect(() => {
    if (notesList !== undefined && notesList.length === 0) {
      if (!init) {
        return;
      }
      setInit(false);
      initRecord();
    }
    return;
  }, [notesList, init]);
  return (
    <div
      className="app"
      onClick={(e) => {
        if (e.target.nodeName !== "path" && e.target.nodeName !== "svg") {
          (e.target?.className.includes("app") ||
            e.target?.className.includes("sidebar")) &&
            setSelected({ is: false, id: null });
        }
      }}
    >
      <div className="app-wrapper">
        <NotesContext.Provider
          value={{
            data: notesList,
            isSelected: [selected, setSelected],
            isEdit: [edit, setEdit],
            isCreate: [create, setCreate],
            area: [areaText, setAreaText],
            isSide: [side, setSide],
            isInit: [init, setInit],
          }}
        >
          <Header />
          <Content />
        </NotesContext.Provider>
      </div>
    </div>
  );
}

export default App;
