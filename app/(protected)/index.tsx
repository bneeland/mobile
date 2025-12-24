import Text from "components/Text";
import { useSetting } from "contexts/SettingContext";
import { auth } from "lib/auth";
import { backend } from "../../lib/utils";
import { useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";
import { Check } from "lucide-react-native";
import Button from "components/Button";
import {
  KeyboardAwareScrollView,
  KeyboardProvider,
} from "react-native-keyboard-controller";

export default function Index() {
  const { setting } = useSetting();
  console.log("setting");
  console.log(setting);

  const [checkins, setCheckins] = useState<any>();
  const [loadingCheckins, setLoadingCheckins] = useState(true);
  const [loadingCheckin, setLoadingCheckin] = useState(false);

  async function loadCheckins() {
    setLoadingCheckins(true);

    const response = await backend({
      method: "get",
      url: "/api/checkins/get-user-checkins",
      headers: {
        Cookie: auth.getCookie(),
      },
    });
    console.log("response");
    console.log(response);

    setCheckins(response.data.checkins);

    setLoadingCheckins(false);
  }

  useEffect(() => {
    loadCheckins();
  }, []);

  const lastReset = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );
  console.log("lastReset");
  console.log(lastReset);
  const nextReset = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1,
  );
  console.log("nextReset");
  console.log(nextReset);
  const currentCheckin = checkins?.find(
    (checkin: any) =>
      new Date(checkin.createdAt) >= lastReset &&
      new Date(checkin.createdAt) < nextReset,
  );
  console.log("currentCheckin");
  console.log(currentCheckin);

  const [h, m] = setting
    ? setting.checkinDeadlineTime.split(":")
    : [undefined, undefined];

  const checkinDeadline = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    h,
    m,
  );
  console.log("checkinDeadline");
  console.log(checkinDeadline);

  return (
    <KeyboardProvider>
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerClassName="p-5"
        refreshControl={
          <RefreshControl
            refreshing={loadingCheckins}
            onRefresh={async () => {
              await loadCheckins();
            }}
          />
        }
      >
        <Text>Current</Text>
        <Text>Today</Text>
        <Text>
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
          }).format(new Date())}
        </Text>
        <Text>Started</Text>
        <Text>
          {setting
            ? new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }).format(new Date(`1970-01-01T${setting.checkinResetTime}`))
            : ""}
        </Text>
        <Text>Check in by</Text>
        <Text>
          {setting
            ? new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }).format(new Date(`1970-01-01T${setting.checkinDeadlineTime}`))
            : ""}
        </Text>

        {checkins &&
          (currentCheckin ? (
            <View className="flex items-center gap-2">
              <Check className="inline size-5" />
              <View>
                <Text>
                  Checked in at{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  }).format(new Date(currentCheckin.createdAt))}
                </Text>
              </View>
            </View>
          ) : (
            <Button
              onPress={async () => {
                setLoadingCheckin(true);

                const response = await backend({
                  method: "post",
                  url: "/api/checkins/create-user-checkin",
                  headers: {
                    Cookie: auth.getCookie(),
                  },
                });
                console.log("response");
                console.log(response);

                setLoadingCheckin(false);

                loadCheckins();
              }}
              disabled={loadingCheckin || !setting?.checkinsEnabled}
              loading={loadingCheckin}
            >
              Check in
            </Button>
          ))}
      </KeyboardAwareScrollView>
    </KeyboardProvider>
  );
}
