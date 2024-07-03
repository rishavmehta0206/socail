import "./online.css";

export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  console.log('firstPF',user)
  let endPoint = "http://localhost:8800/images/";
  let userImage =
  user?.profilePicture.length > 0
    ? endPoint + user?.profilePicture
    : endPoint + "noAvatar.png";
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={userImage} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user?.username}</span>
    </li>
  );
}
