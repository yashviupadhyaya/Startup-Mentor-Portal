$(document).ready(function(){


  console.log("hi");
});
var user_id_list=[];
var user_list=[];
var policies=[];
var requirements=[];
var grants=[];
var events=[];
var posts=[];
var backup_list = [];
var sorted_posts=[];
var comments="";
var sorted_post_id=[];
var post_count_list=[];
var user_id;
var user_name;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user.uid);
    user_id=user.uid;
    get_name_from_id(user.uid);
    retrieve_posts();
  } else {
    console.log("You need to login");
    // No user is signed in.
  }
});

function get_name_from_id(user_id){

  var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
  root=root.child("Users");
  root.once("value", function(snapshot) {
    console.log(snapshot.val());

    user_list=snapshot.val();

    user_name=user_list[user_id]["name"];

    console.log("Name=",name);
  }, function (error) {

    alert("Kuch toh gadbad hai Daya");

   });
}


function retrieve_posts(){
  var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
  root=root.child("Queries");


   root.once("value", function(snapshot) {

     console.log(snapshot.val());
     posts=snapshot.val();
     sort_posts();
     //categorize_posts();
   }, function (error) {

     alert("Kuch toh gadbad hai Daya");

    });


}
function upvote_fun(reference){


  var upvote_count=$(reference).attr("id").split("_")[0];
  var post_id=$(reference).attr("id").slice($(reference).attr("id").indexOf("_")+1,$(reference).attr("id").length);

  var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
  root=root.child("Queries").child(post_id).child("Upvote").set(parseInt(upvote_count)+1);
  console.log(upvote_count+"_"+post_id);
  console.log("number_upvote_"+post_id);
  console.log(document.getElementById("number_upvote_"+post_id));
  document.getElementById("number_upvote_"+post_id).innerHTML=parseInt(upvote_count)+1;
  updated_upvote=parseInt(upvote_count)+1;
  document.getElementById(upvote_count+"_"+post_id).id=updated_upvote+"_"+post_id;

}

function sort_posts(){

  for(post in posts){
    post_count_list.push(posts[post]["Count"]);
    user_id_list.push(post);
  }
  console.log(post_count_list);

  backup_list = post_count_list.slice();
  //console.log("timestamp = ",timestamp_list);
  new_sorted_post_count_list = post_count_list.sort(function(a,b){return a-b});
  console.log("backup_list = ",backup_list);
  console.log(new_sorted_post_count_list);
  for(var m=0;m<new_sorted_post_count_list.length;m++){

      for(var n=0;n<backup_list.length;n++){

          if(new_sorted_post_count_list[m]==backup_list[n]){
              console.log("Inside if");
              console.log(posts[0]);
              sorted_posts[new_sorted_post_count_list.length-m-1]=posts[user_id_list[n]];
              sorted_post_id[new_sorted_post_count_list.length-m-1]=user_id_list[n];
          }
      }
  }
  sorted_posts.shift();
  sorted_post_id.shift();
  console.log(sorted_posts);
  make_posts();
  //categorize_posts();
}


function name_from_id(user_id){
  console.log("user_id",user_id);
  var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
  root=root.child("Users");
  root.once("value", function(snapshot) {
    console.log(snapshot.val());

    user_list=snapshot.val();
    console.log("Returning=",user_list[user_id]["name"],user_id);
    t=user_list[user_id]["name"]+"_"+user_list[user_id]["type"];
    return t;
    console.log(name);
  }, function (error) {

    alert("Kuch toh gadbad hai Daya");

   });
}

function make_posts(){
  for(post in sorted_posts){

    var div = document.createElement('div');
    div.className = 'tweet';
    name=sorted_posts[post]["Name"];
    date=sorted_posts[post]["Date"];
    time=sorted_posts[post]["Time"];
    text=sorted_posts[post]["Description"];
    title=sorted_posts[post]["Title"];
    upvote=sorted_posts[post]["Upvote"];
    tags=sorted_posts[post]["Tags"];
    console.log(sorted_posts[post]);
    uid=sorted_posts[post]["UID"];
    //alert(uid);
    comment_count=sorted_posts[post]["Comments"]["Comment_Count"];
    console.log(comment_count);
    console.log();
    post_id=sorted_post_id[post];
    console.log(post_id);
    string="comments_"+post_id;
    t=name_from_id(uid);

    console.log(sorted_posts[post]["Comments"]);
    for(comment in sorted_posts[post]["Comments"]){
      console.log(sorted_posts[post]["Comments"][comment]);
      if(sorted_posts[post]["Comments"][comment]!=0){
        console.log(sorted_posts[post]["Comments"][comment]);

        for(id in sorted_posts[post]["Comments"][comment]){
          comments+='\
          <div class="tweet">\
          <a class="avatar" href=""><img src="https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"/></a>\
          <div class="infoContainer">\
              <div class="nameContainer"><a href="#"><span class="name" onclick="window.location=mentorview.html?type=mentor&id='+id+'">Raj Kothari</span><span class="atMe">@BobRoss</span><span class="time">11m</span></a></div>\
              <div class="message">\
                  <p>'+sorted_posts[post]["Comments"][comment][id]+'</p>\
              </div>\
          </div>\
          </div>';



      }


    }

      console.log(comments);

    }
    upvote_id=upvote+"_"+post_id;
    comment_id=comment_count+"_"+post_id;
    upvote_value_id="number_upvote_"+post_id;
    comment_value_id="number_comment_"+post_id;
    s="Posted on "+ date + " " + time;

      first='<div class="tweet" style="border:1px solid #D3D3D3">\
    <a class="avatar" href=""><img src="https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"/></a>\
    <div class="infoContainer">\
        <div class="nameContainer"><a href="#"><span class="name" onclick="view_profile();">'+name+'</span><br><span class="atMe">@RajKothari</span><span class="time">'+s+'</span></a><a href="#" class="tag-button" style="float:right;margin-left:200px;">'+tags+'</a></div>\
        <div class="message"><br>\
            <b><b><u>'+title+'</u></b></b>\
            <p>'+text+'</p>\
            \
        </div>\
        <div class="btns">\
        <button><i class="material-icons" id='+upvote_id+' onclick="upvote_fun(this);">thumb_up</i><span id='+upvote_value_id+' class="number">'+upvote+'</span></button>\
            <button><span class="fas fa-comment" id='+post_id+' onclick="commentsToPost(this)"></span><span class="number" id='+comment_value_id+'>'+comment_count+'</span></button>\
        </div>\
        <div id='+string+' class="comment-section-container" style="display:none">'
    comment_description="comment_description_"+post_id;
    row_id="row_"+post_id;
    second=              '<div class="row" id='+row_id+'>\
                              <div class="col-12">\
                                  <div class="card">\
                                      <div class="card-block"></div>\
                                              <textarea id='+comment_description+' style="height: 100%; width: 100%; padding: 4px; margin: 5px;" rows="3" placeholder="Post a comment, share a link, or upload a photo..."></textarea>\
                                              <button id='+comment_id+' class="btn btn-success" onclick="postComment(this)">Post</button>\
                                     </div>\
                                  </div>\
                              </div>\
                      </div>\
      </div>\
  </div>\
  </div>'


    div.innerHTML =first+comments+second;



        document.getElementById('timeline_tweets').prepend(div);
        comments="";
  }

}

function load_comments(){

  var div = document.createElement('div');
  div.className = 'tweet';
//var i = incr();
  div.innerHTML =
  '<a class="avatar" href=""><img src="https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"/></a>\
  <div class="infoContainer">\
      <div class="nameContainer"><a href="#"><span class="name">Bob Ross</span><span class="atMe">@BobRoss</span><span class="time">11m</span></a></div>\
      <div class="message">\
          <p>Just posting some of my work.</p>\
          <img src="https://images.fineartamerica.com/images-medium-large-5/autumns-glow-c-steele.jpg"/>\
      </div>\
      <div class="btns">\
          <button><span class="fas fa-comment"></span><span class="number">45</span></button>\
          <button><span class="fas fa-retweet"></span><span class="number">12.3K</span></button>\
          <button><span class="far fa-heart"></span><span class="number">23.9K</span></button>\
          <button><span class="far fa-envelope"></span><span class="number"></span></button>\
      </div>\
  </div>';
  //document.getElementById("ta_"+i).value="";
  document.getElementById('commentss').appendChild(div);

}



//var user_id = "38l08HvGr4hUutPUQNe1Sx1cITp2"; //fetched from Sign In

function name_from_id(user_id){
  name_and_type=[];
  console.log("Function is called with=",user_id);
  var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
  root=root.child("Users").child(user_id);
  root.once("value", function(snapshot) {
    console.log("Value Event");
    console.log(snapshot.val());

    user_list=snapshot.val();
    console.log("Now",user_list);
    //alert("Name from id",user_list[user_id]["name"]);
    //console.log("Value from=",user_list[user_id]["name"]);
    name_and_type.push(user_list["name"])
    name_and_type.push(user_list["type"]);
    return name_and_type;
    // setTimeout(function(){
    //     console.log("returning",user_list[user_id]["name"]);
    //
    // },2000);

    console.log(name);
  }, function (error) {

    alert("Kuch toh gadbad hai Daya");

   });
}

var comment_count;
var comments=[];
function add_comment(post_id,post){
  var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
  root=root.child("Queries").child(post_id).child("Comments").child("Comment_Count");
  root.once("value", function(snapshot) {

    console.log(snapshot.val());
    comment_count=snapshot.val();
    upload_comment(post_id,post);
    //categorize_posts();
  }, function (error) {

    alert("Kuch toh gadbad hai Daya");

   });
}

function view_profile(){

  window.location="startupview.html?type=startup&id=38l08HvGr4hUutPUQNe1Sx1cITp2";
}
function upload_comment(post_id,comment){
    //var comment=document.getElementById("comment").value;
    var root = new Firebase('https://endgame-ad6a9.firebaseio.com/');
    root.child("Queries").child(post_id).child("Comments").child(comment_count).child(user_id).set(comment);
    root.child("Queries").child(post_id).child("Comments").child("Comment_Count").set(comment_count+1);
}

function toggle_comment_box(post_id){
    string="comments_"+post_id;
    var x=document.getElementById(string);
    console.log("Came here");
    console.log(x);
    x.style.display="none";
    x.style.display="block";

}
