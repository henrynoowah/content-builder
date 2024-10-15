import { EditorContextProps } from "@src/types";
import { useState } from "react";
import SettingsTab from "./SettingsTab";

const SettingsButton = (props: EditorContextProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setToggle(!toggle)}
        className="nwcb-fixed nwcb-top-4 nwcb-end-4 !nwcb-z-30 nwcb-p-2 nwcb-rounded nwcb-bg-slate-100 nwcb-shadow-md"
      >
        Settings
      </button>

      {!!toggle && <SettingsTab {...props} />}
    </>
  );
};

export default SettingsButton;
