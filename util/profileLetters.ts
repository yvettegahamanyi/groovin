export function getUserProfileAlphabets(fullName:string){
    let details=[]
    if(fullName){
      details=fullName.split(' ');
    let firstName:string = details[0];
    let lastName:string = details[1];
    let intials:string = firstName.charAt(0) + lastName.charAt(0);
      let profileImage:string = intials.toUpperCase();

    return profileImage;
    }else{
      console.log("fullname undefined");
      return;
    }
    
}