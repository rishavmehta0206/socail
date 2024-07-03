import { useState } from "react";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useAuthContext } from "../../context/AuthContext/AuthProvider";
import axios from "axios";
import { usePostContext } from "../../context/PostContext/PostProvider";

export default function Share() {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useAuthContext();
  const {dispatch} = usePostContext()

  const submitHandler = async (e) => {
    e.preventDefault();
    const apiBody = {
      userId: user._id,
      desc: description,
    };
    if(file){
      const data = new FormData();
      const fileName = file.name;
      data.append("file",file);
      data.append("name",fileName)
      apiBody.img = fileName;
      try {
        await axios.post("http://localhost:8800/api/upload",data)
      } catch (error) {
        console.log(error)
      }
    }
    try {
      let {data} = await axios.post("http://localhost:8800/api/post", apiBody);
      dispatch({type:"ADD_POST",payload:data})
    } catch (error) {}
  };
  console.log('file',file?.name)
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" style={{
            objectFit:'cover'
          }} src="/assets/person/1.jpeg" alt="" />
          <input
            placeholder="What's in your mind"
            className="shareInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            {/* <label htmlFor="file" className="shareOption"> */}
               <div className="shareOption">
               <label htmlFor="flieUp">
                     <img
                       style={{
                         cursor: "pointer",
                         height: "25px",
                         width: "25px",
                       }}
                       // className="profileUserImg"
                       src="/assets/person/bgImage.png"
                       alt=""
                     />
                   </label>
              <span className="shareOptionText">Photo</span>
              <input
                style={{
                  display: "none",
                }}
                type="file"
                id="flieUp"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
               </div>
            {/* </label> */}
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="submit" className="shareButton">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
