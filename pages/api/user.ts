import axios from "axios";
import baseUrl from "../../util/url";


export const currentUser = async (userId: string): Promise<void> => {
    
    try{  
      let res = await axios.get(`${baseUrl}/user/one/${userId}`);
      let user = res.data.data;
      console.log("user in user.ts ",user);
      }catch (e) {
          console.log(e);
      }
  };
