import "./NotificationItem.css";

interface NotificationItemProps {
  img: string;
  name: string;
  noti: string;
  time: string;
}
export const NotificationItem = ({
  img,
  name,
  noti,
  time,
}: NotificationItemProps) => {
  return (
    <div className="notificationItem">
      <img src={img} alt="" />
      <div className="noti">
        <div style={{ marginBottom: "0.5rem" }}>
          <span>{name}</span>
          <span> {noti}</span>
        </div>
        <span>{time}</span>
      </div>
    </div>
  );
};
