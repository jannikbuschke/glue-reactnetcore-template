import { HubConnectionBuilder } from "@aspnet/signalr";
import { notification } from "antd";
import * as React from "react";

const openNotification = (
  message: string = "This is the content of the notification. This is the content of the notification. This is the content of the notification."
) => {
  notification.open({
    description: message,
    message: "Notification Title"
  });
};

export const handleNotificationsAsync = (baseUrl: string) => {
  const connection = new HubConnectionBuilder()
    .withUrl(`${baseUrl}/lobby`)
    .build();
  connection.on("ReceiveMessage", message => {
    // tslint:disable-next-line:no-console
    console.log("received message", message);
    openNotification(message);
  });
  connection.on("Notification", (n: any) => {
    // tslint:disable-next-line:no-console
    console.log("notification", n);
    openNotification(n.message);
  });
  connection.start();
};

export class Notification extends React.Component {
  public render() {
    return null;
    // <React.Fragment>
    //   <Button
    //     // tslint:disable-next-line:jsx-no-lambda
    //     onClick={() => {
    //       openNotification();
    //     }}
    //   >
    //     notify
    //   </Button>
    // </React.Fragment>
  }
}
