const users=[];

//Join user to chat
function userJoin(id,username,course){
    const user={id,username,course};

    users.push(user);
    return user;
}

//get current user

function getCurrentUser(id){
    return users.find(user=>user.id===id);
}

//user leaves chat we will return username so used [0];
function userLeave(id){
    const index=users.findIndex(user=>user.id==id);

    if(index!==-1) return users.splice(index,1)[0];
}

//Get team users
function getTeamUsers(course){
    return users.filter(user=>user.course===course);
}

module.exports={
    userLeave,
    userJoin,
    getTeamUsers,
    getCurrentUser
};