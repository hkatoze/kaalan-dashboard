import { NotificationItem } from "./NotificationItem";
import IMG from "../../../../../../../../../assets/user1.jpg";
import "./NotificationsList.css";
export const NotificationsList = () => {
  return (
    <div className="notifications">
      <h3 className="head">Last notifications</h3>
      <NotificationItem
        img={IMG}
        name="Vison Business Solution"
        noti="Besoin d'ajout de nouvel employé"
        time="ago 30 minute"
      />
      <NotificationItem
        img={IMG}
        name="Vison Business Solution"
        noti="Besoin d'ajout de nouvel employé"
        time="ago 30 minute"
      />
      <NotificationItem
        img={IMG}
        name="Vison Business Solution"
        noti="Besoin d'ajout de nouvel employé"
        time="ago 30 minute"
      />
      <NotificationItem
        img={IMG}
        name="Vison Business Solution"
        noti="Besoin d'ajout de nouvel employé"
        time="ago 30 minute"
      />
      <NotificationItem
        img={IMG}
        name="Vison Business Solution"
        noti="Besoin d'ajout de nouvel employé"
        time="ago 30 minute"
      />
    </div>
  );
};
