import {
  createContext,
  type Dispatch,
  type ReactNode,
  startTransition,
  useContext,
  useEffect,
  useState,
} from "react";
import { backend } from "../lib/utils";
import { auth } from "../lib/auth";

const { useSession } = auth;

const SettingContext = createContext<{
  setting: any;
  setSetting: Dispatch<any>;
  loadingSetting: boolean;
  loadSetting: () => Promise<void>;
}>({
  setting: undefined,
  setSetting: () => {},
  loadingSetting: true,
  loadSetting: async () => {},
});

export function SettingProvider({ children }: { children: ReactNode }) {
  const { isPending, data } = useSession();

  const [setting, setSetting] = useState<any>(undefined);
  const [loadingSetting, setLoadingSetting] = useState(true);

  async function loadSetting() {
    const response = await backend({
      method: "get",
      url: "/api/settings/get-user-setting",
      headers: {
        Cookie: auth.getCookie(),
      },
    });
    console.log("response");
    console.log(response);

    startTransition(() => {
      setSetting(response.data.setting);

      setLoadingSetting(false);
    });
  }

  useEffect(() => {
    if (!isPending && data) {
      loadSetting();
    }
  }, [isPending, data]);

  return (
    <SettingContext.Provider
      value={{ setting, setSetting, loadingSetting, loadSetting }}
    >
      {children}
    </SettingContext.Provider>
  );
}

export function useSetting() {
  return useContext(SettingContext);
}
